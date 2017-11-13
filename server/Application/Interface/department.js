/// <reference path="../../typings/globals/JikeJs/index.d.ts" />
//@ts-check
let { Interface, Route, Validate } = JikeJs;
import DepartmentController from '../Controller/department';
Interface.create('/dept', DepartmentController, [
  /**
   * 显示所有的系
   */
  Route('/', 'get', 'list', {
    verify: {
      page: {
        type: 'number',
        mode: Validate.EXISTS_VALIDATE
      },
      everyPage: {
        type: 'number',
        mode: Validate.EXISTS_VALIDATE
      },
      searchKey: {
        type: 'string',
        mode: Validate.EXISTS_VALIDATE
      },
    }
  }),
  /**
   * 添加系
   */
  Route('/', 'post', 'creater', {
    verify: {
      name: {
        type: 'string',
        mode: Validate.MUST_VALIDATE
      }
    }
  }),
  /**
   * 修改系信息
   */
  Route('/', 'put', 'update', {
    verify: {
      id:{
        type: 'number',
        mode: Validate.MUST_VALIDATE
      },
      name: {
        type: 'string',
        mode: Validate.EXISTS_VALIDATE
      }
    }
  }),
  /**
   * 删除系
   */
  Route('/','delete','del',{
    verify:{
      ids:{
        type:'array',
        mode:Validate.MUST_VALIDATE
      }
    }
  })
]);