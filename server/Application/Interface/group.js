/// <reference path="../../typings/globals/JikeJs/index.d.ts" />
//@ts-check
let { Interface, Route, Validate } = JikeJs;
const GroupController = require("../Controller/group");
Interface.create('/group',  GroupController, [
  Route('/:id', 'put', 'update', {
    verify: {
      id: {
        type: 'number',
        mode: Validate.MUST_VALIDATE
      },
      file: {
        type: 'file',
        mode: Validate.MUST_VALIDATE
      }
    }
  })
]);