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
    old: String<6, 12>,//旧密码
    password: String<6, 12>//新密码
  },
  return: Boolean,
}
/**
 * 设置头像
 */
interface setHead extends Api {
  name: "/account/head",
  method: m.POST,
  params: {
    id: Number,
    image: File
  },
  return: Boolean
}
