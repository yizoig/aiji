/// <reference path="../../../typings/globals/JikeJs/index.d.ts"/>
let { BaseError, Code } = JikeJs;
const DepartmentModel = require("../Model/department");
export default class extends JikeJs.Controller {

  /**
   * 显示所有的系
   */
  async list({ page = 1, everyPage = 15, searchKey }) {

    let data = await new DepartmentModel().list({ page: page - 1, everyPage, searchKey });
    return data;

  }
  /**
   * 添加系
   */
  async creater({name}){

    let insertId = await new DepartmentModel().creater({name});
    return insertId;
  }
  /**
   * 修改系
   */
  async update({id,name}){

      let result = await new DepartmentModel().update(id,{name});
      return result;
  }
  /**
   * 删除系
   */
  async del({ids=[]}){
    let successIds = await new DepartmentModel().del(ids);
    return successIds;
  }
}