let fs = require("fs");
let path = require("path");
let js_beautify = require("../Library/js_beautify");
module.exports = function loadDBsql() {

    //获取app_path下的所有项目
    let apps = fs.readdirSync(APP_PATH);
    let sqls = {};
    let sqlsJsContent = '';
    for (let app of apps) {
        if(['Common','Runtime','Conf'].indexOf(app)!=-1) continue;
        if(fs.existsSync(APP_PATH+app+'/Common/sqls/')){
            let sqldir = path.join(APP_PATH,app+'/Common/sqls/');
            let files = fs.readdirSync(sqldir);
            let content =[];
            for (let file of files) {
                // console.log(files);
                //加载每一个文件的sql语句
                let fileName = file.substring(0, file.indexOf('.'));
                //获取文件的内容   匹配所有sql及sql变量名称
                let filecontent = fs.readFileSync(sqldir + file).toString();
                let sql_arr =(filecontent.match(/((##[^\n]+(\n))*(#[^\n]+(\n))[^#]+)/g));
                //拆分所有sql及sql变量名称
                sqls[fileName] = {};
                
                let sqlArr = [];
                sql_arr.forEach((item) => {
                    let comment = item.match(/(##[^\n]+\n)*/g).filter((val)=>!(!val||val==''))[0];
                    comment = '/**\r\n'+comment.replace(/##/g,'* ')+'\r\n*/'
                    let sqlName = item.match(/([^#]#[^#])\w+/g)[0].replace('#','').replace(/\s+/g,' ').trim();
                    let sql = item.match(/([^#]#[^#])\w+([^#]+)/g)[0].replace(/([^#]#[^#])\w+/g,'').replace(/\s+/g,' ').trim();
                    sqlArr.push(comment+sqlName+':"'+sql+'"');
                    sqls[fileName][sqlName] = sql;
                });
                content.push(fileName+":{"+sqlArr.join(',')+"}");
            }
            sqlsJsContent = "{"+content.join(',')+"}";
        }
    }
    console.log(sqls );
    saveSqlTypeings(APP_PATH+'../'+'typings/globals/JikeJs/sqls.d.ts',sqlsJsContent)
    global.sqls = sqls;
};


function saveSqlTypeings(file_path,sqlsJsContent){

  let content = 'declare let sqls:'+sqlsJsContent
  content = js_beautify(content);
  fs.writeFileSync(file_path,content)
}