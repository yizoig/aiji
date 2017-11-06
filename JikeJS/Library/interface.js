import fs from 'fs';
import { Logger } from './log4js';
import Validate from './validate';
import 'colors';
let { Router } = require('express');
//参数验证工具
//命令行颜色插件
//express app对象  用于设置路由
let _app = null;
let basepath = '';
class Interface {
  /**
   * 加载interface目录所有的文件
   */
  static init(app) {
    _app = app;
    //接口文件目录
    let apps = fs.readdirSync(APP_PATH);
    for (let app of apps) {
      if (['Common', 'Runtime', 'Conf'].indexOf(app) != -1) continue;
      basepath = '/' + app;
      let InterfacePath = APP_PATH + app + '/Interface/';
      if (fs.statSync(InterfacePath).isDirectory() && fs.existsSync(InterfacePath)) {
        //获取interface目录下的所有文件名
        let files = fs.readdirSync(InterfacePath);
        //加载接口文件
        for (let filename of files) {
          require(InterfacePath + filename);
        }
      }
    }
  }
  /**
   * 創建接口
   * @param {*} path 父路由
   * @param {*} controllerClass 路由控制器 
   * @param {*} routers 子路由
   */
  static create(_path, controllerClass, routers) {
    let expressRouter = Router();

    //遍历interface的所有路由
    routers.forEach(router => {
      //设置路由
      /**
       * method 請求方式
       * childrenPath 子路由地址
       * args 驗證參數等等
       */
      let { method, name: childrenPath, args = {}, action } = router;

      expressRouter[method](childrenPath, async (req, res, next) => {
        try {
          //输出用户请求api 创建controller
          let controller = new controllerClass(req, res, next);
          controller.reqUser = {};
          controller.request = req;
          controller.response = res;
          //needtoken默认为true
          if (fs.existsSync(APP_PATH + "/comment/jwt") && !("needToken" in args) || args.needToken) {
            let { verifyToken = (token) => { } } = require(APP_PATH + "/comment/jwt");
            let user = await verifyToken(req.header('access-token'));
            controller.reqUser = user;
          }
          //参数格式化
          let { cb = null, ...params } = Object.assign(
            req.params || {},
            req.query || {},
            req.body || {},
            req.files || {},
          );
         //當存在參數驗證條件時 对参数进行验证
          if ("verify" in args) {
            let type = req.header('type');
            params = Validate.autoCheck(params, args.verify);
          }
          //执行action方法 將請求參數傳遞給指定的控制器方法
          let result = await controller[router.action](params);

          if (cb) {
            res.jsonp({
              code: 0,
              data: result
            });
          } else {
            res.json({
              code: 0,
              data: result
            });
          }
        } catch (err) {
          Logger.error(err);
          //如果是自定義的異常錯誤  就返回錯誤信息 否則返回通用異常
          res.status(err.code / 1000 == 5 ? 500 : 200);
          let returnMessage = {
            code: err.code || JikeJs.Code.SERVER_ERR
          };
          //存在错误或描述才显示
          err.message && (returnMessage['err_mes'] = err.message)
          err.detail && (returnMessage['detail'] = err.detail)
          res.json(returnMessage)
        }
      })
    });
    //添加路由到express app
    _app.use(basepath + _path, expressRouter);
  }
}
exports.Route = (name, method, action, args = {}) => ({ name, method, action, args })
exports.Interface = Interface;