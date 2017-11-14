
const TeacherModel = require("../Model/teacher");
const { passwordEncrypt } = require("../Common/function");
module.exports = class extends JikeJs.Controller {

  /**
   * 获取所有的教师
   */
  async list({ page = 1, everyPage = 15, searchKey, deptId }) {

    let data = await new TeacherModel().list({ page: page - 1, everyPage, searchKey, deptId });
    return data;

  }
  /**
   * 添加教师
   */
  async creater({ account, password, name, gender, deptId }) {
    let insertId = await new TeacherModel().creater({ account, password: passwordEncrypt(password), name, gender, deptId });
    return insertId;
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
  async signUp({ account,name, password, deptId }) {
    let insertId = await new TeacherModel().creater({ account,name, password: passwordEncrypt(password), deptId });
    return insertId;
  }
}