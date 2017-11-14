const GroupModel = require("../Model/group");
module.exports = class extends JikeJs.Controller {

  /**
   * 获取所有的群
   */
  async list({  creater,member,page = 1, everyPage = 15, searchKey }) {

    return new GroupModel().list({ creater,member, page:page-1, everyPage, searchKey });
  }
  /**
   * 创建群
   */
  async creater({ name, type = "group" }) {
    return new GroupModel().creater({ name, type });
  }
  /**
   * 修改群信息
   */
  async update({ id, name, type }) {
    return new GroupModel().update(id, { name, type });
  }
  /**
   * 删除群
   */
  async del({ ids }) {
    return new GroupModel().del(ids);
  }
  /**
   * 解散群
   */
  async dissolve({ id }) {
    return new GroupModel().del([id]);
  }
    /**
   * 获取群列表
   */
  async memberList({id,gender,page = 1, everyPage = 15, searchKey}){
    return new GroupModel().memberList(id,{page:page-1,gender,everyPage,searchKey});
  }
  /**
   * 添加群成员
   */
  async addMember({ id, members }) {
    return new GroupModel().addMember(id, members);
  }
  /**
   * 删除群成员
   */
  async delMember({ id, members }) {
    return new GroupModel().delMember(id, members);
  }
}