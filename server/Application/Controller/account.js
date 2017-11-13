
const AccountModel = require("../Model/account");
const { passwordEncrypt } = require("../Common/function");
const { makeToken } = require("../Common/jwt");
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
    let result = await new AccountModel().setPwd({ id, password: passwordEncrypt(password) });
    return result;
  }
  /**
   * 修改个人密码
   */
  async updatePwd({ oldPwd, newPwd }) {
    let result = await new AccountModel().updatePwd({ id: 1, oldPwd: passwordEncrypt(oldPwd), newPwd: passwordEncrypt(newPwd) });
    return result;
  }
  /**
   * 设置头像
   */
  async setHead({ id, img }) {
    console.log("设置头像");
  }
}