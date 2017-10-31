let mysql = require("mysql");
let path = require("path");

let config = require(path.resolve(".") + '/config/database/mysql');
module.exports = class Mysql {

    async connect() {
        return new Promise((resolve, reject) => {
            this.connection = mysql.createConnection(config);
            this.connection.connect(err => err ? reject("数据库连接失败") : resolve(this.connect))
        })
    }
    async query(sql, option) {

        if (!this.connection) {
            await this.connect();
        }
        return new Promise((resolve, reject) => {
            let q = this.connection.query(sql, option, (err, results, fields) => {
                this.connection.destroy();
                err ? reject(err) : resolve(results);
            })
            this.getLastSql = () => q.sql;
        })
    }

}
