module.exports = {
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
    //手机号已存在
    TEL_EXISTS: 1104,
    //手机号不存在
    TEL_NOTEXISTS: 1105,
    //新手机号已被占用
    NEW_TEL_EXISTS:1106,
    //旧手机号不存在
    OLD_TEL_NOTEXISTS:1107,

    //手机号验证码错误
    TEL_CODE_ERR:1108,
    //旧手机号验证码错误
    OLD_TEL_CODE_ERR:1109,
    //新手机号验证码错误
    NEW_TEL_CODE_ERR:1120,

    //头像类型不正确
    AVATAR_TYPE_ERR:1200,
    ORDER_TYPE_ERR:2000,
    NOT_OWN_ERR:2001,
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
