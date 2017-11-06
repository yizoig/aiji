/// <reference path="../../../typings/globals/JikeJs/index.d.ts" />
//@ts-check
let { Interface, Route, Validate } = JikeJs;
import DepartmentController from '../Controller/department';
Interface.create('/dept', DepartmentController, [
  /**
   * 添加系
   */
  Route('/', 'post', 'index', {
    verify: {
      number: {
        type: 'number',
        mode: Validate.MUST_VALIDATE,
        rule: [
        ]
      },
      string: {
        type: 'string',
        mode: Validate.MUST_VALIDATE,
        rule: [
        ]
      },
      array: {
        type: 'array',
        mode: Validate.MUST_VALIDATE,
        rule: [
        ]
      },
      object: {
        type: 'object',
        mode: Validate.MUST_VALIDATE,
        rule: [
        ]
      },
    }
  }),
]);