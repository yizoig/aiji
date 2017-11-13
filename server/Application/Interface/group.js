/// <reference path="../../typings/globals/JikeJs/index.d.ts" />
//@ts-check
let { Interface, Route, Validate } = JikeJs;
const GroupController = require("../Controller/group");
Interface.create('/group',  GroupController, [
  /**
   * 获取所有的群组
   */
  Route('/', 'get', 'list', {
    verify: {
      page: {
        type: 'number',
        mode: Validate.EXISTS_VALIDATE
      },
      everyPage: {
        type: 'file',
        mode: Validate.EXISTS_VALIDATE
      },
      searchKey: {
        type: 'file',
        mode: Validate.EXISTS_VALIDATE
      }
    }
  }),
]);