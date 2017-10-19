import {Api,method as m, Number,Boolean,String} from './Api.d';

// ============班级(classes)api=================


/**
 * 获取班级列表
 */
interface GetClasses extends Api{
    name:'/classes',
    method:m.GET,
    params:{
        page:Number,
        pageLimit:Number,
        pageable:Boolean,
        dept_id?:Number //学院id
    }
    return:{
        list:Array<{
            class_id:Number, //班级id
            class_name:String,//班级名称
            dept_id:Number, //学院id
        }>
    }
}

/**
 * 添加班级
 */
interface CreateClass extends Api{
    name:'/classes',
    method:m.POST,
    params:{
        class_name:String,//班级名称
        dept_id:Number, //学院id
    }
    return:{
        id:Number, //班级id
    }
}

/**
 * 修改班级
 */
interface UpdateClass extends Api{
    name:'/classes/:id',
    method:m.PUT,
    params:{
        class_name:String,//班级名称
        dept_id:Number, //学院id
    }
    return:Boolean
}

/**
 * 删除班级 (暂时彻底删除)
 */
interface DeleteClass extends Api{
    name:'/classes',
    method:m.DELETE,
    params:{
        ids:Array<Number>,//删除的id
    }
    return:Boolean
}
