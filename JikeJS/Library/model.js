let Mysql = require("../Db/mysql");
let { BaseError } = require('../Library/error')
let { Code } = require("../Code/code");

module.exports = class Model extends Mysql {

    constructor(table) {
        super();
    }
    fileter(data) {
        console.log(data, 11)
        for (let key in data) {
            let item = data[key]
            if (Object.prototype.toString.call(item) == "[object Array]" || Object.prototype.toString.call(item) == "[object Object]") {
                item = this.fileter(item);
            } else {
                if (Object.prototype.toString.call(item) == "[object Undefined]") {
                    delete data[key];
                    continue;
                }
            }
        }
        return data;
    }
    /**
     * 覆盖msyql方法
     * @param {*} sql
     * @param {*} options
     */
    async query(sql, ...options) {
        sql = sql.replace(/\s+/g, ' ');
        options = this.fileter(options||[])
        try {
            //进行字段映射
            let result = await super.query({
                sql,
                // nestTables:'_',
                values: options
            });
            return result;
        } catch (e) {
            console.log(e);
            throw new BaseError(Code.SQL_ERR, e.message);
        }

    }
}