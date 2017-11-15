const GroupModel = require("../Model/group");
module.exports = class extends JikeJs.Controller {

  /**
   * 获取所有的群
   */
  async list({ creater, member, page = 1, everyPage = 15, searchKey }) {

    return new GroupModel().list({ creater, member, page: page - 1, everyPage, searchKey });
  }
  /**
   * 创建群
   */
  async creater({ name, type = "group" }) {

    //只有管理员可以创建班级
    if (type == "class" && this.user.type !== "admin") {
      throw new JikeJs.BaseError(JikeJs.Code['CREATER_CLASS_ERR']);
    }
    return new GroupModel().creater({ id: this.user.id, name, type });
  }
  /**
   * 修改群信息
   */
  async update({ id, name, type }) {
    return new GroupModel().update(id, { name, type },this.user);
  }
  /**
   * 删除群
   */
  async del({ ids }) {
    if (this.user.type !== "admin") {
      throw new JikeJs.BaseError(JikeJs.Code['UNAUTH']);
    }
    return new GroupModel().del(ids);
  }
  /**
   * 解散群
   */
  async dissolve({ id }) {

    return new GroupModel().dissolve(id, this.user.id);
  }
  /**
 * 获取群列表
 */
  async memberList({ id, gender, page = 1, everyPage = 15, searchKey }) {
    return new GroupModel().memberList(id, { page: page - 1, gender, everyPage, searchKey });
  }
  /**
   * 添加群成员
   */
  async addMember({ id, members }) {
    return new GroupModel().addMember(id, members, this.user);
  }
  /**
   * 删除群成员
   */
  async delMember({ id, members }) {
    return new GroupModel().delMember(id, members, this.user);
  }
}