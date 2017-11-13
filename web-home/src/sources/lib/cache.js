//import pako from 'pako';
var pako = require("pako")

const deflate = str => JSON.stringify(Object.values(pako.deflate(str)));


const inflate = str => {

    let arr = JSON.parse(str);
    let u8arr = new Uint8Array(arr.length);

    arr.forEach((e, index) => u8arr[index] = e);
    return pako.inflate(arr, { to: "string" })
}

Storage.prototype.getJsonItem = (key) => {

    let item = this.getItem(key)

    return inflate(item);
}
Storage.prototype.setJsonItem = (key, data) => {

    if (!this[k]) return null;
    this.setItem(key, deflate(JSON.stringify(data)));
}

let cache = {

    get session() {
        return sessionStorage;
    },
    get local() {
        return localStorage;
    }
};

export default cache;