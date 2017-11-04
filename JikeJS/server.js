'use strict';
import 'colors';
import './Library/index';
import { version_compare } from './Common/function.js';
if (version_compare(process.version, 'v8.0.0', '>')) {
    console.error("node版本必须大于v8.0.0".red);
}
//定义全局变量
//进入库
//加载yizo库
import express from 'express';
import http from 'http';
import https from 'https';
import fs from 'fs';
import multer from 'multer';
import bodyParser from 'body-parser';
import upload from './Library/upload.js';
import loadDBsql from './Db/sql_loader';
import { Logger, log4js } from './Library/log4js';
import cors from 'cors';
import { Interface } from './Library/interface';
module.exports = class Server {

    constructor() {
        //创建express
        this.app = express();
    }
    /**
     * 设置中间件
     */
    set middleware(_middleware) {
        this._middleware = _middleware;
    }
    /**
     * 初始化
     */
    async init() {
        //加载中间件
        await this.middleConfig();
    }
    /**
     * 配置中间件
     */
    async middleConfig() {

        Logger.info("加载解析参数中间件中...");
        //解析 x-wwww-form-urlencoded
        this.app.use(bodyParser.urlencoded({ extended: false })) //extended为false表示使用querystring来解析数据，这是URL-encoded解析器  
        // 解析 application/json   
        this.app.use(bodyParser.json()) //添加
        this.app.use(multer({ dest: APP_PATH + '/runtime/cache' }).any());

        //设置返回方式
        this.app.set('jsonp callback name', 'cb');
        Logger.info("加载上传文件的中间件中...");
        this.app.use(upload);
        Logger.info("设置跨域请求...");
        await this.app.use(cors());
        await this.app.use((req, res, next) => {
            res.header("Access-Control-Allow-Headers", 'access-token');
            //访问控制暴露头
            res.header("Access-Control-Expose-Headers", 'access-token');
            next();
        })

        Logger.info("加载sql语句...");
        await loadDBsql();

        Logger.info("加载路由中...");
        Interface.init(this.app);
        this.app.use(express.static(APP_PATH + '/static/upload'));
        this.app.use((req, res, next) => {

            let code = res.statusCode;
            console.log(req.method.yellow, req.url.green, code < 400 ? `${code}`.green : `${code}`.red, new Date().toLocaleString());
            next();
        })
        Logger.info("加载用户自定义中间件...");
        await this._middleware(this.app);
        //配置用户
        Logger.info("加载404及500...");
        this.app.use(function (req, res, next) {

            let err = new JikeJs.BaseError(JikeJs.Code.API_NOTFOUND);
            err.detail = "请正确调用接口";
            err.status = '404';
            next(err);
        });

        //异常捕获
        this.app.use(function (err, req, res, next) {
            res.locals.message = err.message;
            res.locals.error = req.app.get('env') === 'development' ? err : {};


            console.log(err);
            res.status(err.status || 500)
            if ("code" in err && err.code) {
                res.json({
                    code: err.code,
                    err_mes: err.message,
                    detail: err.detail
                })
            } else {
                res.json({
                    code: 500,
                    err_mes: "服务器异常",
                    detail: "服务器异常，请稍后再试"
                })
            }
        });
    }
    /**
     * 运行服务器
     */
    async run() {
        await this.init();
        let serverConfig = require(APP_PATH + '../server');
        //配置服务器参数
        serverConfig = Object.assign({
            "port": 3000,
            "protocol": "http"
        }, serverConfig['server'] || {});

        if (serverConfig['protocol'] == "http" && serverConfig['credentials']) {
            serverConfig['credentials']['key'] = fs.readFileSync(APP_PATH + '/config/' + serverConfig['credentials']['key'], 'utf-8');
            serverConfig['credentials']['cert'] = fs.readFileSync(APP_PATH + '/config/' + serverConfig['credentials']['cert'], 'utf-8');
        }
        if (serverConfig['protocol'] == "http") {
            //监听端口
            http.createServer(this.app).listen(serverConfig.port, '0.0.0.0', () => {
                Logger.info(`监听 http://localhost:${serverConfig.port}`)
            })
        } else {
            //监听端口
            https.createServer(serverConfig['credentials'], this.app).listen(serverConfig.port, '0.0.0.0', () => {
                Logger.info(`https://localhost:${serverConfig.port}`)
            })
        }

    }
}
//专门捕获promise异常
process.on('unhandledRejection', (reason, p) => {
    console.log("Unhandled Rejection at: Promise ", p, " reason: ", reason);
}); 