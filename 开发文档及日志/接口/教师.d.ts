import { Api, method as m, Number, Boolean, String, TimeStamp } from './Api.d';

// ============教师(teacher)api=================

/**
 * 获取所有的教师
 */
interface list extends Api {
  name: "/teacher",
  method: m.GET,
  params: {
    page?: Number,//页码 默认0
    everyPage?: Number,//每一页的条数
    searchKey?: String,//关键字搜索
    dept: Number
  },
  return: {
    everyPage: Number,
    total: Number,
    list: Array<{
      id: Number,
      account: String,//登录帐号
      dept: Number,
      dept_name: String,
      name: String,//名称
      gender: 0 | 1,//性别
      _c: TimeStamp,//加入时间
      _d: Number
    }>
  }
}
/**
 * 创建教师
 */
interface creater extends Api {
  name: "/teacher",
  method: m.GET,
  params: {
    account: String,//登录帐号
    name?: String,//名称
    password: String<6, 12>,//登录密码
    gender?: 0 | 1,//性别
    dept: Number
  },
  return: {
    data: Number//返回添加成功的id
  }
}
/**
 * 修改教师信息
 */
interface update extends Api {
  name: "/teacher/:id",
  method: m.PUT,
  params: {
    id:Number,
    name?: String,//名称
    gender?: 0 | 1,//性别
  },
  return: {
    data: Boolean//返回添加成功的id
  }
}
/**
 * 删除教师(不可以恢复)
 */
interface del extends Api {
  name: "/teacher",
  method: m.DELETE,
  params: {
    id: Array<Number>//需要删除的id
  },
  return: {
    data: Boolean
  }
}
/**
 * 注册教师 暂时分离
 */
interface signUp extends Api {
  name: "/teacher/signUp",
  method: m.POST,
  params: {
    account: String,//登录帐号
    password: String<6, 12>,//登录密码
    dept: Number//学院
  },
  return: {
    data: Number//返回添加成功的id
  }
}