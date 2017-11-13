/// <reference path="../../typings/globals/JikeJs/index.d.ts"/>
const StudentModel = require("../Model/student");
const { passwordEncrypt } = require("../Common/function");
module.exports = class extends JikeJs.Controller {

  /**
   * 获取所有的学生
   */
  async list({ page = 1, everyPage = 15, searchKey,dept }) {

    let data = await new StudentModel().list({ page: page - 1, everyPage, searchKey,dept });
    return data;

  }
  /**
   * 添加学生
   */
  async creater({ account, password, name, gender, dept }) {
    let insertId = await new StudentModel().creater({ account, password: passwordEncrypt(password), name, gender, dept });
    return insertId;
  }
  /**
   * 修改学生信息
   */
  async update({id,dept}){
    let result = await new StudentModel().update(id,{dept});
    return result;
  }
   /**
   * 删除学生
   */
  async del({ids=[]}){
    let successIds = await new StudentModel().del(ids);
    return successIds;
  }
}