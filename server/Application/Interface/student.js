/// <reference path="../../typings/globals/JikeJs/index.d.ts" />
//@ts-check
let { Interface, Route, Validate } = JikeJs;
const StudentController = require("../Controller/student");
Interface.create('/student', StudentController, [
  /**
   * 显示所有的学生
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
      deptId:{
        type: 'number',
        mode: Validate.EXISTS_VALIDATE
      },
    }
  }),
  /**
   * 添加学生
   */
  Route('/', 'post', 'creater', {
    verify: {
      account: {
        type: 'string',
        mode: Validate.MUST_VALIDATE
      },
      name: {
        type: 'string',
        mode: Validate.MUST_VALIDATE
      },
      password: {
        type: 'string',
        mode: Validate.MUST_VALIDATE
      },
      deptId:{
        type: 'number',
        mode: Validate.MUST_VALIDATE
      },
      gender: {
        type: 'number',
        mode: Validate.EXISTS_VALIDATE,
        rule: [
          [[0, 1], "genderErr", 'in']
        ]
      },
    }
  }),
  /**
   * 删除学生
   */
  Route('/', 'delete', 'del', {
    verify: {
      ids: {
        type: 'array',
        mode: Validate.MUST_VALIDATE
      }
    }
  }),
   /**
   * 注册学生
   */
  Route('/signUp', 'post', 'signUp', {
    verify: {
      account: {
        type: 'string',
        mode: Validate.MUST_VALIDATE
      },
      password: {
        type:'string',
        mode: Validate.MUST_VALIDATE
      },
      deptId:{
        type: 'number',
        mode: Validate.MUST_VALIDATE
      },
      name:{
        type: 'string',
        mode: Validate.MUST_VALIDATE
      }
    },
    needToken:false
  }),
]);