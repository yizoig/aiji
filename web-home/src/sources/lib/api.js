import api from '../config/api';
import cache from './cache';
import code from './code';
import mes from './mes';

let codes = {};
for (let key in code) {
    codes[code[key]] = mes[key];
}
//解析键值对
function parseData(key, value) {
    let ret = { key: key, values: [] };
    if (typeof value === 'Array') {
        ret.key = `${key}[]`;
        ret.values = value
    } else if (typeof value === "string" || value instanceof File || value instanceof Blob) {
        ret.values = [value];
    } else {
        ret.values = [JSON.stringify(value)];
    }
    return ret;
}
//请求参数处理
function makeData(_url, method, params, { blobName = {} }) {

    let ret = { url: _url, body: new FormData() };
    let urlData = [];
    for (let key in params) {
        let { key: keyName, values } = parseData(key, params[key])
        values.forEach(value => {
            if (method == "GET") {
                urlData.push(key + '=' + encodeURI(value));
            } else {
                let _blobName = (value instanceof Blob && blobName[key]) ? ([blobName[key]]) : [];
                ret.body.append(keyName, value, ..._blobName);
            }
        })
    }
    ret.url += urlData.length > 0 ? `?${urlData.join("&")}` : '';
    ret.body.length <= 0 && delete ret.body;
    return ret;
}

//发起请求
function dofetch(_url, method, params = {}, desc) {

    params = JSON.parse(JSON.stringify(params));
    return new Promise((resolve, reject) => {
        
        //替换url参数
        let arr = _url.match(/\/:[a-zA-Z][0-9a-zA-Z]+/g);
        if (params && arr != null) {
            for (let k in arr) {
                if (arr[k].substring(2) in params) {
                    _url = _url.replace(arr[k], '/' + params[arr[k].substring(2)]);
                    delete params[arr[k].substring(2)];
                }
            }
        }
        
        let { url, body } = makeData(_url, method, params, desc);
        let codeStatus = 200;
        fetch(api.host + url, {
            method,
            mode: "cors",
            headers: {
                'access-token': cache.local.getItem("access-token")
            },
            ...(method !== 'GET') ? { body } : {}
        }).then(res => {
            codeStatus = res.status;
            //查看是否存在token
            let newToken = res.headers.get('access-token');

            if (newToken) {
                cache.local.setItem('access-token', newToken);
            }
            return res.json();
        }).then(result => {

            if (result.err) throw new Error(result.err);
            if (result.code == 0) {
                resolve(result.data);
            } else {
                throw new Error(codes[result.code]);
            }
        }).catch(e => {
            switch (e.message) {
                case 'Failed to fetch':
                    reject(new Error("服务器异常"));
                    break;
                default: reject(e);
            }
        })
    })
}
export let Api = {
    get: url => async (params, desc = {}) => await dofetch(url, "GET", params, desc),
    post: url => async (params, desc = {}) => await dofetch(url, "POST", params, desc),
    put: url => async (params, desc = {}) => await dofetch(url, "PUT", params, desc),
    delete: url => async (params, desc = {}) => await dofetch(url, "DELETE", params, desc),
}