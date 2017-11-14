/// <reference path="../../typings/globals/JikeJs/index.d.ts" />
module.exports = class extends JikeJs.Model {
  /**
   * 获取所有的群
   */
  async list({ creater, member, page, everyPage, searchKey }) {

    let sql = " select groups.group_id id,group_name name,group_creater,group_type,_c,_d from groups ";
    let totalSql = " select count(*) as total from groups ";
    let whereArr = [];
    let args = [];
    //根据群成员查询群
    if (member) {
      sql += " left join group_members ON groups.group_id = group_members.group_id ";
      whereArr.push(' (member=?) ');
      args.push(member);
    }
    //根据关键字查询id name
    if (searchKey) {
      whereArr.push('(group_id like ? or group_name like ?)');
      args.push(`%${searchKey}%`, `%${searchKey}%`);
    }
    //根据创建人查询群
    if (creater) {
      whereArr.push(' (group_creater=?) ');
      args.push(creater);
    }
    //获取总条数
    let [{ total }] = await this.query(totalSql +  (whereArr.length > 0 ? (" where " + whereArr.join("and")) : ""), ...args);
    let list = [];

    //如果数据不为0  就获取数据
    if (total != 0) {
      //设置分页
      let limitStr = " limit ?,?";
      args.push(page * everyPage, everyPage);
      list = await this.query(sql + (whereArr.length > 0 ? (" where " + whereArr.join("and")) : "") + limitStr, ...args);
    }
    return {
      total,
      everyPage,
      list
    }
  }
  /**
   * 创建群
   */
  async creater({ name, type }) {
    //判断群名是否存在
    let [{ total }] = await this.query("select count(*) as total from groups where group_name=?", name);
    if (total > 0) {
      throw new JikeJs.BaseError(JikeJs.Code['GROUP_NAME_EXISTS']);
    }
    let { insertId } = await this.query(sqls.group.creater, [name, type,new Date().getTimeStamp()]);
    return insertId ? insertId : false;
  }
  /**
   * 获取群信息
   * @param {*} id 
   */
  async info(id) {
    let [info] = await this.query(sqls.group.info, id);
    return info || null;
  }
  /**
   * 修改群信息
   */
  async update(id, data) {

    if (!(await this.info(id))) {
      throw new JikeJs.BaseError(JikeJs.Code['GROUP_NOT_EXISTS']);
    }
    data  =this.filter(data);
    if (Object.keys(data).length == 0) {
      throw new JikeJs.BaseError(JikeJs.Code['NOT_CHANGE']);
    }
    let {type,name} = data;
    let { affectedRows } = await this.query(sqls.group.update+" WHERE group_id =?", {group_name:name,group_type:type},id);
    return affectedRows > 0;
  }
  /**
   * 删除群
   */
  async del(ids) {
    //开启事务
    await this.startTrans();
    let { affectedRows: affectedRows1 } = await this.query("delete from group_members where group_id in (?)", ids)
    let { affectedRows: affectedRows2 } = await this.query("delete from groups where group_id in (?)", ids);
    if (affectedRows1 >= 0 && affectedRows2 >= 0) {
      await this.commit();
      return true;
    }
    await this.rollback();
    return false;
  }
  async memberList(id, { gender, page, everyPage, searchKey }) {

    let sql = " select * from group_members join accounst on accounts.account_id=group_members.account_id";
    let totalSql = " select count(*) as total from group_members join accounts on accounts.account_id=group_members.account_id";
    let whereArr = ['(group_id =?)'];
    let args = [id];
    if (searchKey) {
      whereArr.push(`(group_members.account_id like ?,accounts.account_name like ?)`);
      args.push(`%${searchKey}%`, `%${searchKey}%`);
    }
    if (gender) {
      whereArr.push(`(accounts.account_gender = ?)`);
      args.push(gender);
    }
    //获取条数
    let [{ total }] = await this.query(totalSql + whereArr.join("and"), ...args);
    let list = [];
    if (total > 0) {
      //设置分页
      let limitStr = " limit ?,?";
      args.push(page * everyPage, everyPage);
      list = await await this.query(totalSql + whereArr.join("and")+limitStr, ...args);
    }
    return {
      total,everyPage,list
    }
  }
  /**
    * 添加群成员
    */
  async addMember(id, members = []) {
    if (!(await this.info(id))) {
      throw new JikeJs.BaseError(JikeJs.Code['GROUP_NOT_EXISTS']);
    }
    let { affectedRows } = this.query('REPLACE into group_members(group_id,account_id,_c) values (??)', members.forEach((value) => [id, value,new Date().getTimeStamp()]))
    return affectedRows > 0;
  }
  /**
   * 删除群成员
   */
  async delMember(id, members) {
    if (!(await this.info(id))) {
      throw new JikeJs.BaseError(JikeJs.Code['GROUP_NOT_EXISTS']);
    }
    let { affectedRows } = this.query('delete from group_members where group_id=? and account_id in ()', id, members);
    return affectedRows > 0;
  }
}