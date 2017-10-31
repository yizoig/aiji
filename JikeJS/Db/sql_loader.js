let fs = require("fs");
let path = require("path");


module.exports = function loadDBsql() {

    //获取app_path下的所有项目
    let apps = fs.readdirSync(APP_PATH);
    let sqls = {};
    let sqlsArr  = {};
    for (let app of apps) {
      console.log(APP_PATH+app+'/Common/sqls')
        if(fs.existsSync(APP_PATH+app+'/Common/sqls/')){
            let sqldir = path.join(APP_PATH,app+'/Common/sqls/');
            let files = fs.readdirSync(sqldir);
            for (let file of files) {
                // console.log(files);
                //加载每一个文件的sql语句
                let fileName = file.substring(0, file.indexOf('.'));
                //获取文件的内容   匹配所有sql及sql变量名称
                let values = fs.readFileSync(sqldir + file).toString().match(/[^#]#[^#]+/gi) || [];
                // console.log(values);
                //拆分所有sql及sql变量名称
                let sql_arr = values.map(str => str.match(/#\w+/));
                sqlsArr[fileName] = {};
                sqls[fileName] = {};
                sql_arr.forEach((item) => {
    
                    //获取sql和名称
                    let sql = item['input'];
                    sql = sql.replace(item[0], '').replace(/\s+/ig, ' ').trim();
                    let name = item[0];
                    name = name.replace(/#/ig, '');
                    sqlsArr[fileName][name] = 'String';
                    sqls[fileName][name] = sql;
                });
            }
        }
    }
    console.log(sqlsArr,sqls);
    saveSqlTypeings(APP_PATH+'../'+'typings/globals/JikeJs/sqls.d.ts',sqlsArr)
    global.sqls = sqls;
};


function saveSqlTypeings(file_path,sqlsArr){

  let content = 'declare let sqls:'+JSON.stringify(sqlsArr);
  content = content.replace(/"/g,'');
  content = content.replace(/([{},])/g,'$1\r\n\t')
  fs.writeFileSync(file_path,content)
}