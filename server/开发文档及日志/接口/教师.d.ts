import { Api, method as m, Number, Boolean, String,TimeStamp } from './Api.d';

// ============教师(teacher)api=================

/**
 * 获取所有的教师
 */
interface list extends Api{
  name:"/account/teacher",
  method:m.GET,
  params:{
    page?:Number,//页码 默认0
    exeryPage?:Number,//每一页的条数
    searchKey?:String//关键字搜索
  },
  return:Array<{
    id:Number,
    account:String,//登录帐号
    name:String,//名称
    gender:0|1,//性别
    _c:TimeStamp//加入时间
  }>
}
/**
 * 创建教师
 */
interface creater extends Api{
  name:"/account/teacher",
  method:m.GET,
  params:{
    account:String,//登录帐号
    name:String,//名称
    password:String<6,12>,//登录密码
    gender:0|1,//性别
  },
  return:Number//返回添加成功的id
}
/**
 * 修改教师信息
 */
interface update extends Api{
  name:"/account/teacher",
  method:m.PUT,
  params:{
    name:String,//名称
    gender:0|1,//性别
  },
  return:Boolean//返回添加成功的id
}
/**
 * 删除教师(不可以恢复)
 */
interface del extends Api{
  name:"/account/teacher",
  method:m.DELETE,
  params: {
    id: Array<Number>//需要删除的id
  },
  return: Array<Number>//返回删除成功id
}