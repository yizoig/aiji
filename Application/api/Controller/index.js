/// <reference path="../../../typings/globals/JikeJs/index.d.ts"/>
let { BaseError, Code } = JikeJs;
export default class IndexController extends JikeJs.Controller {
    async index(data){
        return data;
    }
}