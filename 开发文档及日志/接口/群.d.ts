import { Api, method as m, Number, Boolean, String } from './Api.d';

// ============群(group)api=================

/**
 * 获取所有的群组
 */
interface list extends Api {
  name: "/group",
  method: m.GET,
  params: {
    page?: Number,//页码 默认0
    everyPage?: Number,//每一页的数量  默认15
    searchKey?: String,//搜索关键字 针对 群组名,群id
  },
  return:{
    everyPage:Number,
    total:Number,
    list: Array<{
      group_id: Number,
      group_name: Number,
      creater:String,//创建人
      _c:Number,//创建时间
      admins:Array<Number>,//管理员
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
    group_name: Number,//群组名称
    admins:Array<Number>,
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
    group_name: Number,//群组名称
    type:"class"|"group"
  }
  return:{
    data: Boolean
  }
}
/**
 * 删除（解散）群
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
 * 添加成员
 */
interface addMember extends Api {
  name: "/group/member/:id",
  method: m.POST,
  params: {
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
  name: "/group/member/:id",
  method: m.DELETE,
  params: {
    members: Array<Number>//删除成功的成员id
  },
  return: {
    data:Boolean
  }
}