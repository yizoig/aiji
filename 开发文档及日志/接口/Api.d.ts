


/**
 * 请求方法
 */
export namespace method {
  export type GET = number;			//get请求
  export type POST = number;			//post请求
  export type PUT = number;			//put请求
  export type DELETE = number;			//delete请求
}
/**
 * api
 */
interface Api {
  //接口名称
  name: string,
  // 请求方式
  method: method.GET | method.POST | method.PUT | method.DELETE,
  // 请求参数
  params?: {
    [index: string]: any
  },
  // 成功返回
  return: any,
  needToken: boolean

}

export class String<MIN extends number=any,MAX extends number=any> { }

export class Number<S extends number=any,E extends number=any> { }

export class Boolean { }

export class TimeStamp { }
export class File { }