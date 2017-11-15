module.exports = {
  SUCCESS: {
    mes: "请求成功"
  },
  NOT_CHANGE: {
    mes: "数据没改变"
  },
  //令牌错误
  TOKEN_ERR: {
    mes: "身份验证失败",
    detail: "请重新登录"
  },
  CREATER_CLASS_ERR:{
    mes: "没有权限创建班级",
    detail: "只有管理可以创建班级"
  },
  NOT_CREATER_GROUP_ERR:{
    mes:"你不是创建人，不能进行操作",
  },
  //令牌失效
  TOKEN_INVALID: {
    mes: "身份已失效",
    detail: "请重新登录"
  },
  SIGNIN_ERR: {
    mes: "账号或密码错误",
    detail: "请重新登录"
  },
  UNAUTH: {
    mes: "您没有权限操作"
  },
  //账户存在
  ACCOUNT_EXISTS: {
    mes: "账户已被占用",
    detail: "请换个账户试试"
  },
  //账户不存在
  ACCOUNT_NOTEXISTS: {
    mes: "账户不存在"
  },
  //账户已被禁用
  ACCOUNT_DISABLE: {
    mes: "账户已被禁用"
  },
  //密码错误
  PASSWORD_ERR: {
    mes: "密码错误"
  },
  OLD_PASSWORD_ERR:{
    mes:"旧密码错误",
    detail:"请重试"
  },
  NOT_FOUND_ERR: {
    mes: "数据不存在"
  },
  GROUP_NAME_EXISTS:{
    mes:"群名已被使用",
    detail:"请换一个群名"
  },
  GROUP_NOT_EXISTS:{
    mes:"群不存在",
    detail:"群不存在"
  },
  //参数错误
  PARAMS_ERR: {
    mes: "参数错误"
  },
  //API不存在
  API_NOTFOUND: {
    mes: "api不存在"
  },
  //服务器错误
  SERVER_ERR: {
    mes: "服务器异常"
  },
  SQL_ERR: {
    mes: "服务器异常"
  },
  //连接数据库超时
  CON_DB_TIMEOUT: {
    mes: "连接数据库超时"
  },
  UN_KNOWN_ERROR: {
    mes: "未知错误"
  },
  DEPT_NAME_REAPT: {
    mes: "该系名已被占用",
    detail: "请换名"
  },
  DEPT_NOT_EXISTS: {
    mes: "系不存在",
    detail: "请刷新后再试"
  }
}