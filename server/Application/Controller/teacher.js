
const TeacherModel = require("../Model/teacher");
const { passwordEncrypt } = require("../Common/function");
module.exports = class extends JikeJs.Controller {

  /**
   * 获取所有的教师
   */
  async list({ page = 1, everyPage = 15, searchKey, dept }) {

    let data = await new TeacherModel().list({ page: page - 1, everyPage, searchKey, dept });
    return data;

  }
  /**
   * 添加教师
   */
  async creater({ account, password, name, gender, dept }) {
    let insertId = await new TeacherModel().creater({ account, password: passwordEncrypt(password), name, gender, dept });
    return insertId;
  }
  /**
   * 修改教师信息
   */
  async update({ id, name,gender }) {
    let result = await new TeacherModel().update(id, {  name,gender  });
    return result;
  }
  /**
   * 删除教师
   */
  async del({ ids = [] }) {
    let successIds = await new TeacherModel().del(ids);
    return successIds;
  }
  
  /**
   * 注册教师
   */
  async signUp({ account, password, dept }) {
    let insertId = await new TeacherModel().creater({ account, password: passwordEncrypt(password), dept });
    return insertId;
  }
}