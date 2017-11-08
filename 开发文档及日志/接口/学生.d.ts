import { Api, method as m, Number, Boolean, String,TimeStamp } from './Api.d';

// ============学生(student)api=================

/**
 * 获取所有的学生
 */
interface list extends Api{
  name:"/account/student",
  method:m.get,
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
 * 创建学生
 */
interface creater extends Api{
  name:"/account/student",
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
 * 修改学生信息
 */
interface update extends Api{
  name:"/account/student",
  method:m.PUT,
  params:{
    name:String,//名称
    gender:0|1,//性别
  },
  return:Boolean//返回添加成功的id
}
/**
 * 删除学生(不可以恢复)
 */
interface del extends Api{
  name:"/account/student",
  method:m.DELETE,
  params: {
    id: Array<Number>//需要删除的id
  },
  return: Array<Number>//返回删除成功id
}