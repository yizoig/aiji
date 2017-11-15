/// <reference path="../../typings/globals/JikeJs/index.d.ts"/>
const AccountModel = require("../Model/account");
const { passwordEncrypt } = require("../Common/function");
const { makeToken } = require("../Common/jwt");
const gm = require("gm");
module.exports = class extends JikeJs.Controller {
  /**
   * 登录
   */
  async signIn({ account, password }) {
    let data = await new AccountModel().signIn({ account, password: passwordEncrypt(password) });
    let { id, type, _d } = data;
    //生成token
    let token = makeToken({
      id,
      type
    })
    //设置响应头header
    this.header("access-token", token)
    return data;
  }
  /**
   * 修改密码
   */
  async setPwd({ id, password }) {

    if (this.user.type !== "admin") {
      throw new JikeJs.BaseError(JikeJs.Code['UNAUTH']);
    }
    let result = await new AccountModel().setPwd({ id, password: passwordEncrypt(password) });
    return result;
  }
  /**
   * 修改个人密码
   */
  async updatePwd({ oldPwd, newPwd }) {

    oldPwd = passwordEncrypt(oldPwd);
    newPwd = passwordEncrypt(newPwd);
    if (this.user.password != oldPwd) {
      throw new JikeJs.BaseError(JikeJs.Code['OLD_PASSWORD_ERR']);
    }
    let result = await new AccountModel().updatePwd({ id: this.user.id, oldPwd, newPwd });
    return result;
  }
  /**
   * 修改基本信息
   */
  async updateBaseinfo({ id, name, gender }) {
    /**
     * 如果不是管理员或者没有传入id   表示修改自己的信息
     */
    if (this.user.type != "admin" || !id) {
      id = this.user.id;
    }
    let result = await new AccountModel().updateBaseinfo(id, { name, gender });
    return result;
  }
  /**
   * 设置头像
   */
  async setHead({ id, img }) {
    console.log("设置头像");
    gm(50, 50, "#f00").drawText(40, 40, id).write(`../static/account/head/${id}.png`, (err) => {
      console.log(err)
      if (err) {
        this.json(err);
      } else {
        this.json("ok")
      }
    });
  }
}