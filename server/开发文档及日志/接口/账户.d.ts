import { Api, method as m, Number, Boolean, String, TimeStamp, File } from './Api.d';

// ============账户(account)api=================

/**
 * 设置密码
 */
interface setPwd extends Api {
  name: "/account/setPwd",
  method: m.PUT,
  params: {
    id: Number,
    password: String<6, 12>
  },
  return: Boolean,
}
/**
 * 修改个人密码
 */
interface updatePwd extends Api {
  name: "/account/pwd",
  method: m.PUT,
  params: {
    oldPwd: String<6, 12>,//旧密码
    newPwd: String<6, 12>//新密码
  },
  return: Boolean,
}
/**
 * 设置头像
 */
interface setHead extends Api {
  name: "/account/head",
  method: m.PUT,
  params: {
    id: Number,
    image: File
  },
  return: Boolean
}
/**
 * 登录接口  统一
 */
interface signIn extends Api {
  name: "/account/signIn",
  method: m.POST,
  params: {
    account: String,
    password: String
  },
  return: {
    id: Number,
    name: String,
    gender: 0 | 1,
    dept?: Number,
    dept_name: String,
    _c: TimeStamp
  }
}