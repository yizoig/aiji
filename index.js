/// <reference path="./typings/globals/JikeJs/index.d.ts" />
'use strict';
import path from 'path';
//开启调试
global['APP_DEBUG'] = true;
//app路径
global['APP_PATH'] = path.join(__dirname, './Application/');
//库路径
global['JikeJs_PATH'] = path.join(__dirname, 'JikeJs');
// import Server from './JikeJS/server';
let Server =  require("./JikeJS/server");
let server = new Server();
/**
 * 设置中间件
 */
server.middleware = (app) => {
};
/**
 * 启动服务器
 */
server.run();
