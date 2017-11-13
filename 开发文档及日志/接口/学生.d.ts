import { Api, method as m, Number, Boolean, String, TimeStamp } from './Api.d';

// ============学生(student)api=================

/**
 * 获取所有的学生
 */
interface list extends Api {
  name: "/student",
  method: m.GET,
  params: {
    page?: Number,//页码 默认0
    everyPage?: Number,//每一页的条数
    searchKey?: String,//关键字搜索
    dept?: Number
  },
  return: {
    everyPage: Number,
    total: Number,
    list: Array<{
      id: Number,
      account: String,//登录帐号
      name: String,//名称
      gender: 0 | 1,//性别
      type: String,
      dept_name: String
      dept: Number,
      _c: TimeStamp//加入时间
      _d: Number
    }>
  }
}
/**
 * 创建学生
 */
interface creater extends Api {
  name: "/student",
  method: m.POST,
  params: {
    account: String,//登录帐号
    password: String<6, 12>,//登录密码
    name?: String,
    gender?: 0 | 1,
    dept: Number,//学院
  },
  return: {
    data: Number//返回添加成功的id
  }
}
/**
 * 修改学生信息
 */
interface update extends Api {
  name: "/student/:id",
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
/**
 * 删除学生(不可以恢复)
 */
interface del extends Api {
  name: "/student",
  method: m.DELETE,
  params: {
    ids: Array<Number>//需要删除的id
  },
  return: {
    data: Array<Number>//返回删除成功id
  }
}
/**
 * 注册学生  暂时分离
 */
interface signUp extends Api {
  name: "/student/signUp",
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