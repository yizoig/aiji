/// <reference path="../../typings/globals/JikeJs/index.d.ts" />
//@ts-check
let { Interface, Route, Validate } = JikeJs;
const GroupController = require("../Controller/group");
Interface.create('/group', GroupController, [
  /**
   * 获取所有的群组
   */
  Route('/', 'get', 'list', {
    verify: {
      creater: {
        type: "number",
        mode: Validate.EXISTS_VALIDATE
      },
      member: {
        type: "number",
        mode: Validate.EXISTS_VALIDATE
      },
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
      }
    },
    needToken:false
  }),
  /**
   * 创建群
   */
  Route("/", 'post', 'creater', {
    verify: {
      name: {
        type: "string",
        mode: Validate.MUST_VALIDATE
      },
      type: {
        type: "string",
        mode: Validate.MUST_VALIDATE
      }
    }
  }),
  /**
   * 修改群信息
   */
  Route("/", 'put', 'update', {
    verify: {
      id: {
        type: "number",
        mode: Validate.MUST_VALIDATE
      },
      name: {
        type: "string",
        mode: Validate.EXISTS_VALIDATE
      },
      type: {
        type: "string",
        mode: Validate.EXISTS_VALIDATE
      }
    }
  }),
  /**
   * 删除群
   */
  Route("/", 'delete', 'del', {
    verify: {
      ids: {
        type: "array",
        mode: Validate.MUST_VALIDATE
      }
    }
  }),
  /**
   * 解散群
   */
  Route("/dissolve", 'delete', "dissolve", {
    verify: {
      id: {
        type: "number",
        mode: Validate.MUST_VALIDATE
      }
    }
  }),
  /**
   * 获取群成员列表
   */
  Route("/member", "get", "memberList", {
    verify: {
      id: {
        type: "number"
      },
      gender: {
        type: 'number',
        mode: Validate.EXISTS_VALIDATE
      },
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
      }
    }
  }),
  /**
   * 添加成员
   */
  Route("/member", "post", "addMember", {
    verify: {
      id: {
        type: "number"
      },
      members: {
        type: "array",
        mode: Validate.MUST_VALIDATE
      }
    }
  }),
  /**
   * 删除
   */
  Route("/member", "delete", "delMember", {
    verify: {
      id: {
        type: "number"
      },
      members: {
        type: "array",
        mode: Validate.MUST_VALIDATE
      }
    }
  })
]);