import { Api, method as m, Number, Boolean, String } from './Api.d';

// ============班级(classes)api=================


/**
 * 获取班级列表
 */
interface list extends Api {
  name: '/classes',
  method: m.GET,
  params: {
    page?: Number,//页码  默认0开始
    everyPage?: Number,//每一页的数量 默认15
    dept_id?: Number, //根据学院的id  获取班级
    searchKey?: String//搜索字符串  针对班级名进行模糊查询
  }
  return: {
    everyPage: Number,
    total: Number,
    list: Array<{
      class_id: Number, //班级id
      class_name: String,//班级名称
      dept_id: Number, //学院id
    }>
  }
}

/**
 * 添加班级
 */
interface creater extends Api {
  name: '/classes',
  method: m.POST,
  params: {
    class_name: String,//班级名称
    dept_id: Number, //学院id
  }
  return: {
    id: Number, //班级id
  }
}

/**
 * 修改班级
 */
interface update extends Api {
  name: '/classes/:id',//在url处传入id
  method: m.PUT,
  params: {
    class_name: String,//班级名称
  }
  return: Boolean
}

/**
 * 删除班级 (暂时彻底删除)
 */
interface del extends Api {
  name: '/classes',
  method: m.DELETE,
  params: {
    ids: Array<Number>,//删除的id
  }
  return: Array<Number>//返回成功删除的id
}
