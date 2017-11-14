import { Api, method as m, Number, Boolean, String, TimeStamp, File } from './Api.d';

// ============账户(account)api=================
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
    deptId: Number,
    deptName: String,
    type: String,
    _c: TimeStamp,
    _d: Number
  }
}
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
  return: {
    data: Boolean
  }
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
  return: {
    data: Boolean
  }
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
  return: {
    data: Boolean
  }
}

/**
 * 修改基本信息
 */
interface updateBaseinfo extends Api {
  name: "/account/baseinfo",
  method: m.PUT,
  params: {
    id:Number,
    name?: String,//名称
    gender?: 0 | 1,//性别
  },
  return: {
    data: Boolean
  }
}