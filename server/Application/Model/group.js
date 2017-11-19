/// <reference path="../../typings/globals/JikeJs/index.d.ts" />
module.exports = class extends JikeJs.Model {
  /**
   * 获取所有的群
   */
  async list({ deptId,type, creater, member, page, everyPage, searchKey }) {
    let sql = " select groups.group_id id,group_name name,group_creater creater,group_type AS type,dept_id AS deptId,_c,_d from groups ";
    let totalSql = " select count(*) as total from groups ";
    let whereArr = [];
    let args = [];
    //根据群成员查询群
    if (member) {
      sql += " left join group_members ON groups.group_id = group_members.group_id ";
      whereArr.push(' (member=?) ');
      args.push(member);
    }
    if(type!="all"){
      whereArr.push('(group_type = ?)');
      args.push(type);
    }
    //获取某学院的群
    if(deptId){
      whereArr.push('(dept_id = ?)');
      args.push(deptId);
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
    let [{ total }] = await this.query(totalSql + (whereArr.length > 0 ? (" where " + whereArr.join("and")) : ""), ...args);
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
  async creater({ id, name, type }) {
    //判断群名是否存在
    let [{ total }] = await this.query("select count(*) as total from groups where group_name=?", name);
    if (total > 0) {
      throw new JikeJs.BaseError(JikeJs.Code['GROUP_NAME_EXISTS']);
    }
    let { insertId } = await this.query(sqls.group.creater, [name, id, type, new Date().getTimeStamp()]);
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
  async update(id, data,user) {

    let info = await this.info(id);
    if (!info) {
      throw new JikeJs.BaseError(JikeJs.Code['GROUP_NOT_EXISTS']);
    }
    if(user.type!=="admin" && user.id!=info['creater']){
      throw new JikeJs.BaseError(JikeJs.Code['UNAUTH']);
    }
    data = this.filter(data);
    if (Object.keys(data).length == 0) {
      throw new JikeJs.BaseError(JikeJs.Code['NOT_CHANGE']);
    }
    let { type, name } = data;
    let { affectedRows } = await this.query(sqls.group.update + " WHERE group_id =?", { group_name: name, group_type: type }, id);
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
  /**
  * 解散群
  */
  async dissolve(id, userId) {

    let info = await this.info(id);
    if (!info) {
      throw new JikeJs.BaseError(JikeJs.Code['GROUP_NOT_EXISTS']);
    }
    if (info['creater'] != userId) {
      throw new JikeJs.BaseError(JikeJs.Code['NOT_CREATER_GROUP_ERR']);
    }
    //开启事务
    await this.startTrans();
    let { affectedRows: affectedRows1 } = await this.query("delete from group_members where group_id = ?", id)
    let { affectedRows: affectedRows2 } = await this.query("delete from groups where group_id = ?", id);
    if (affectedRows1 >= 0 && affectedRows2 > 0) {
      await this.commit();
      return true;
    }
    await this.rollback();
    return false;
  }
  async memberList(id, { gender, page, everyPage, searchKey }) {

    let sql = " select accounts.account_id AS id,account_number as account,account_type as type,dept_id as deptId,account_name as name,account_gender as gender,accounts._c,accounts._d,group_members._c as joinTime from group_members join accounts on accounts.account_id=group_members.account_id";
    let totalSql = " select count(*) as total from group_members join accounts on accounts.account_id=group_members.account_id";
    let whereArr = ['(group_id =?)'];
    let args = [id];
    if (searchKey) {
      whereArr.push(`(accounts.account_number like ? or accounts.account_name like ?)`);
      args.push(`%${searchKey}%`, `%${searchKey}%`);
    }
    if (gender != undefined || gender != null) {
      whereArr.push(`(accounts.account_gender = ?)`);
      args.push(gender);
    }
    //获取条数
    let [{ total }] = await this.query(totalSql + (whereArr.length > 0 ? (" where " + whereArr.join("and")) : ""), ...args);
    let list = [];
    if (total > 0) {
      //设置分页
      let limitStr = " limit ?,?";
      args.push(page * everyPage, everyPage);
      list = await this.query(sql + (whereArr.length > 0 ? (" where " + whereArr.join("and")) : "") + limitStr, ...args);
    }
    return {
      total, everyPage, list
    }
  }
  /**
    * 添加群成员
    */
  async addMember(id, members = [],user) {
    let info = await this.info(id);
    if (!info) {
      throw new JikeJs.BaseError(JikeJs.Code['GROUP_NOT_EXISTS']);
    }
    if(user.type!=="admin" && user.id!=info['creater']){
      throw new JikeJs.BaseError(JikeJs.Code['UNAUTH']);
    }
    let time = new Date().getTimeStamp();
    let arr = [];
    let args = []
    members.forEach((value) => {
      arr.push('(?)');
      args.push([id, value, time]);
    });
    console.log(arr, args);
    let { affectedRows } = await this.query(`insert ignore into group_members(group_id,account_id,_c) values ${arr.join(',')}`, ...args)
    return affectedRows > 0;
  }
  /**
   * 删除群成员
   */
  async delMember(id, members,user) {
    let info = await this.info(id);
    if (!info) {
      throw new JikeJs.BaseError(JikeJs.Code['GROUP_NOT_EXISTS']);
    }
    if(user.type!=="admin" && user.id!=info['creater']){
      throw new JikeJs.BaseError(JikeJs.Code['UNAUTH']);
    }
    let { affectedRows } = await this.query('delete from group_members where group_id=? and account_id in (?)', id, members);
    return affectedRows > 0;
  }
}