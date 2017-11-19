module.exports ={
  //令牌错误
  TOKEN_ERR: 1000,
  //令牌失效
  TOKEN_INVALID: 1001,
  //登录失败，账号或密码错误
  SIGNIN_ERR: 1002,
  //没有权限操作
  UNAUTH:1003,
  //账户存在
  ACCOUNT_EXISTS: 1100,
  //账户不存在
  ACCOUNT_NOTEXISTS: 1101,
  //账户被禁用
  ACCOUNT_DISABLE: 1102,
  //密码错误
  PASSWORD_ERR: 1103,
  
  DEPT_NAME_REAPT:1104,
  DEPT_NOT_EXISTS:1105,
  OLD_PASSWORD_ERR:1106,
  CREATER_CLASS_ERR:1107,
  NOT_CREATER_GROUP_ERR:1108,
  NOT_OWN_ERR:2001,
  //群名存在
  GROUP_NAME_EXISTS:2002,
  GROUP_NOT_EXISTS:2003,
   //数据不存在
  NOT_FOUND_ERR:4001,
  //请求成功
  SUCCESS: 0,
  NOT_CHANGE:1,
  //参数错误
  PARAMS_ERR:3000,
  //API不存在
  API_NOTFOUND:4000,
  //服务器错误
  SERVER_ERR:5000,
  //连接数据库超时
  CON_DB_TIMEOUT:5001,
  SQL_ERR:5002,
  UN_KNOWN_ERROR:5003
}