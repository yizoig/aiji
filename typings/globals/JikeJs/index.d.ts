/// <reference path="./sqls.d.ts"/>
decalre let APP_PATH: String;
decalre let JIKE_PATH: String;
class Controller {
    json(data: any): void;
    status(code: Number): void;
    header(key: String, value: any): void;
    request:Request;
    response:Response;
    reqUser:{
        id:any,
        type:any
    }
}
class Mysql {
    escape(value: String): String;
    getConnection(): Promise;
    query(options: Object): String;
    startTrans(): void;
    rollback(): void;
    commit(): void;
}
class Model extends Mysql {
    _map: any;
    query(sql: String, ...options: any);
}
interface router {
    name: String,
    method: String,
    action: String,
    args: Object
}
declare function Route(name: String, method: String, action: String, args?: { verify?: Object<{ mode: Number, rule: Array }>, needToken?: Boolean }): router
class Interface {
    static init(app: any);
    static create(path: String, controllerClass: any, routers: Route[]);
}

interface Error {
    detail: String;
    status: String | Number
}
class ValidationError extends Error {
    constructor(detail: String);
}
class BaseError extends Error {
    constructor(code: Number, detail?: String);
}
declare let encrypt = {
    md5: (value: String) => any,
    sha256: (value: String, key: String) => any,
    base64url: {
        encode:(value: String) => any,
        decode:(value: String) => any
    },
    sha1: (value: String) => any
}

declare let request = {
    http: (option: Object) => Object,
    https: (option: Object) => Object
}

class Validate {
    static EXISTS_VALIDATE = 0;
    static VALUE_VALIDATE = 0;
    static MUST_VALIDATE = 0;
    static autoCheck(params: Object, validate: any);
}

declare let Code: any;
declare let JikeJs = {
    Controller, Model, Interface, Route, ValidationError, BaseError, Validate, encrypt, Code, request
}

declare let sqls: any;