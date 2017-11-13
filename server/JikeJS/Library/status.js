
exports.Status = {
    //成功
    SUCCESS: 200,

    /**
     * [POST/PUT/PATCH]：用户新建或修改数据成功。
     */
    CREATED: 201,

    //表示一个请求已经进入后台排队（异步任务）
    ACCEPTED: 202,

    //用户删除数据成功。---不用
    DELETED: 204,

    //用户发出的请求有错误，服务器没有进行新建或修改数据的操作，该操作是幂等的。
    INVALID_REQUEST: 400,

    //表示用户没有权限（令牌、用户名、密码错误）。
    UNAUTH: 401,
    //参数不能为空
    PARAMETER_WRONG: 402,

    //表示用户得到授权（与401错误相对），但是访问是被禁止的。。
    FORBIDDEN: 403,

    //用户发出的请求针对的是不存在的记录，服务器没有进行操作，该操作是幂等的。
    NOT_FOUND: 404,

    //用户请求的格式不可得（比如用户请求JSON格式，但是只有XML格式）。
    NOT_ACCEPTABLE: 406,

    //用户请求的资源被永久删除，且不会再得到的。
    GONE: 410,

    //当创建一个对象时，发生一个验证错误。
    UNPROCESABLE: 422,

    //服务器发生错误，用户将无法判断发出的请求是否成功。
    SERVER_ERROR: 500,
}