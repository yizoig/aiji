/// <reference path="../../typings/globals/JikeJs/index.d.ts"/>
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
  async creater({ name }) {

    if (this.user.type !== "admin") {
      throw new JikeJs.BaseError(JikeJs.Code['UNAUTH']);
    }
    let insertId = await new DepartmentModel().creater({ name });
    return insertId;
  }
  /**
   * 修改系
   */
  async update({ id, name }) {
    if (this.user.type !== "admin") {
      throw new JikeJs.BaseError(JikeJs.Code['UNAUTH']);
    }
    let result = await new DepartmentModel().update(id, { name });
    return result;
  }
  /**
   * 删除系
   */
  async del({ ids = [] }) {
    if (this.user.type !== "admin") {
      throw new JikeJs.BaseError(JikeJs.Code['UNAUTH']);
    }
    let successIds = await new DepartmentModel().del(ids);
    return successIds;
  }
}