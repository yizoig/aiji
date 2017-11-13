/// <reference path="../../../typings/globals/JikeJs/index.d.ts"/>

let salt = "@aiji"
module.exports = {
  passwordEncrypt: (password) => {
    return JikeJs.encrypt.md5(password + salt);
  }
}