/// <reference path="../../typings/globals/JikeJs/index.d.ts" />
//@ts-check
let { Interface, Route, Validate } = JikeJs;
const AccountController = require("../Controller/account");
Interface.create('/account', AccountController, [

  /**
   * 登录
   */
  Route('/signIn', 'post', 'signIn', {
    verify: {
      account: {
        type: "string",
        mode: Validate.MUST_VALIDATE
      },
      password: {
        type: "string",
        mode: Validate.MUST_VALIDATE
      }
    },
    needToken: false
  }),
  /**
   * 获取基本信息
   */
  Route("/info", "get", "info", {
    verify: {
      id: {
        type: "number",
        mode: Validate.MUST_VALIDATE
      },
    },
    needToken: false
  }),
  /**
   * 修改密码
   */
  Route('/setPwd', 'put', 'setPwd', {
    verify: {
      id: {
        type: 'number',
        mode: Validate.MUST_VALIDATE
      },
      password: {
        type: 'number',
        mode: Validate.MUST_VALIDATE
      }
    }
  }),
  /**
   * 修改个人密码
   */
  Route('/pwd', 'put', 'updatePwd', {
    verify: {
      oldPwd: {
        type: 'string',
        mode: Validate.MUST_VALIDATE
      },
      newPwd: {
        type: 'string',
        mode: Validate.MUST_VALIDATE
      }
    }
  }),
  /**
   * 设置头像
   */
  Route('/head/:id', 'get', 'setHead', {
    verify: {
      id: {
        type: 'number',
        mode: Validate.MUST_VALIDATE
      },
      img: {
        type: 'file',
        mode: Validate.EXISTS_VALIDATE
      }
    }
  }),
  /**
 * 修改基本信息
 */
  Route('/baseinfo', 'put', 'updateBaseinfo', {
    verify: {
      id: {
        type: 'number',
        mode: Validate.EXISTS_VALIDATE
      },
      name: {
        type: 'string',
        mode: Validate.EXISTS_VALIDATE
      },
      gender: {
        type: 'number',
        mode: Validate.EXISTS_VALIDATE,
        rule: [
          [[0, 1], "genderErr", 'in']
        ]
      }
    }
  })
]);