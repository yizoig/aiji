import { Api, method as m, Number, Boolean, String } from './Api.d';
// =============学院(departments)api===========

/**
 * 获取所有的学院
 */
interface list extends Api {
  name: '/depts',
  method: m.GET,
  params: {
    searchKey?: String,//搜索字符串 ，针对name进行模糊查询
    page: Number,//页码 默认0开始(第一页)
    everyPage: Number//每一页的数量  默认15
  },
  return: {
    everyPagesssssssssssssss: Number,
    total: Number,
    list: Array<{
      id: Number,//学院id
      name: String//学院名
    }>
  }
}
/**
 * 创建学院
 */
interface creater extends Api {
  name: '/depts',
  method: m.POST,
  params: {
    name: String,//学院名 (不能重复)
  }
  return: {
    id: Number//添加的学院id
  }
}
/**
 * 修改学院信息
 */
interface update extends Api {
  name: '/depts',
  params: {
    id:String,//学院id
    name: String, //学院名
  }
  return: Boolean
}

/**
 * 删除学院(不支持恢复)
 */
interface del extends Api {
  name: '/depts',
  params: {
    ids: Array<Number>  //需要删除的id
  }
  return: Array<Number> //返回成功删除的id
}
