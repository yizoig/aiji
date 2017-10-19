import {Api,method as m, Number,Boolean,String} from './Api.d';
// =============学院(departments)api===========

/**
 * 获取所有的学院(暂时不分页)
 */
interface GetDepts extends Api{
    name:'/depts',
    method:m.GET,
    return:{
        dept_id:Number,//学院id
        dept_name:String//学院名
    }
}
/**
 * 创建学院
 */
interface CreaterDept extends Api{
    name:'/depts',
    method:m.POST,
    params:{
        name:String,//学院名
    }
    return:{
        id:Number//学院id
    }
}
/**
 * 修改学院信息
 */
interface UpdateDept extends Api{
    name:'/depts/:id',
    params:{
        name:String, //学院名
    }
    return:Boolean
}

/**
 * 删除学院(不支持恢复)
 */
interface DeleteDept extends Api{
    name:'/depts',
    params:{
        ids:Array<Number>  //需要删除的id
    }
    return:Boolean //成功返回ture
}
