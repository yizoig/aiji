import { Api, method as m, Number, Boolean, String } from './Api.d';

// ============群(group)api=================

/**
 * 获取所有的群组
 */
interface list extends Api {
  name: "/group",
  method: m.GET,
  params: {
    creater?:Number,//获取创建人的群  精确查询
    member?:Number,//获取指定群成员的群 精确查询
    page?: Number,//页码 默认0
    everyPage?: Number,//每一页的数量  默认15
    searchKey?: String,//搜索关键字 针对 群组名,群id
  },
  return:{
    everyPage:Number,
    total:Number,
    list: Array<{
      id: Number,
      name: Number,
      creater:String,//创建人
      _c:Number,//创建时间
      type:"class"|"group"
    }>
  }
}

/**
 * 创建新群
 */
interface creater extends Api {
  name: "/group",
  method: m.POST,
  params: {
    name: String,//群组名称
    type:"class"|"group"
  },
  return:{
    data: Number//添加成功的群id
  }
}
/**
 * 修改群信息
 */
interface update extends Api {
  name: "/group",
  method: m.PUT,
  params: {
    id:Number,
    name: String,//群组名称
    type:"class"|"group"
  }
  return:{
    data: Boolean
  }
}
/**
 * 删除群(管理员)
 */
interface del extends Api {
  name: "/group",
  method: m.DELETE,
  params: {
    ids: Array<Number>//需要删除的群id
  },
  return:{
    data: Array<Number>//返回删除成功的群
  }
}
/**
 * 解散群（创建人）
 */
interface dissolve extends Api {
  name: "/group/dissolve",
  method: m.DELETE,
  params: {
    id:Number,//需要删除的群id
  },
  return:{
    data: Array<Number>//返回删除成功的群
  }
}
/**
 * 获取群成员
 */
interface memberList extends Api{
  name: "/group/member",
  method: m.GET,
  params: {
    id:Number,
    gender?:0|1,
    page?: Number,//页码 默认0
    everyPage?: Number,//每一页的数量  默认15
    searchKey?: String,//搜索关键字 针对 群成员
  },
  return: {
    data:Array<{
      id:Number,
      name:String,
      gender:"0"|"1",
      type:String,
      account:String,
      _c:String,
      _d:Number
    }>
  }
}
/**
 * 添加成员
 */
interface addMember extends Api {
  name: "/group/member",
  method: m.POST,
  params: {
    id:Number,
    members: Array<Number>//添加成功的成员id
  },
  return: {
    data:Boolean
  }
}

/**
 * 删除群成员
 */
interface removeMember extends Api {
  name: "/group/member",
  method: m.DELETE,
  params: {
    id:Number,
    members: Array<Number>//删除成功的成员id
  },
  return: {
    data:Boolean
  }
}