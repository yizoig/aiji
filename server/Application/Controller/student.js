/// <reference path="../../typings/globals/JikeJs/index.d.ts"/>
const StudentModel = require("../Model/student");
const { passwordEncrypt } = require("../Common/function");
module.exports = class extends JikeJs.Controller {

  /**
   * 获取所有的学生
   */
  async list({ page = 1, everyPage = 15, searchKey,deptId }) {

    let data = await new StudentModel().list({ page: page - 1, everyPage, searchKey,deptId });
    return data;

  }
  /**
   * 添加学生
   */
  async creater({ account, password, name, gender, deptId }) {
    let insertId = await new StudentModel().creater({ account, password: passwordEncrypt(password), name, gender, deptId });
    return insertId;
  }
   /**
   * 删除学生
   */
  async del({ids=[]}){
    let successIds = await new StudentModel().del(ids);
    return successIds;
  }
   /**
   * 注册学生
   */
  async signUp({account,password,name,deptId}){
    let insertId = await new StudentModel().creater({ account,name, password: passwordEncrypt(password), deptId });
    return insertId;
  }
}