/// <reference path="../../typings/globals/JikeJs/index.d.ts" />

module.exports = class extends JikeJs.Model {
  /**
   * 获取所有的学生
   */
  async list({ page, everyPage, searchKey, deptId }) {

    let args = [];
    let whereArr = [];
    if (searchKey) {
      whereArr.push("(account_number like ? or account_name like ?)")
      args.push(`%${searchKey}%`, `%${searchKey}%`);
    }
    if (deptId) {
      whereArr.push("(departments.dept_id = ?)")
      args.push(deptId);
    }
    //查询条数
    let [{ total }] = await this.query(sqls.student.total + (whereArr.length > 0 ? (" where " + whereArr.join("and")) : ""), ...args);
    let list = [];
    if (total > 0) {
      args.push(page * everyPage, everyPage);
      list = await this.query(sqls.student.list + (whereArr.length > 0 ? (" where " + whereArr.join("and")) : "") + " limit ?,?", ...args);
    }
    return {
      everyPage,
      total,
      list
    }
  }
  /**
   * 创建学生
   */
  async creater({ account, password, name, gender, deptId }) {

    //先查看。账户是否存在
    let [{ total }] = await this.query(sqls.account.total + " where account_number = ?", account);
    if (total > 0) {
      throw new JikeJs.BaseError(JikeJs.Code['ACCOUNT_EXISTS']);
    }
    //判断系是否存在
    [{ total }] = await this.query(sqls.department.total + " where dept_id=?", deptId);
    if (total == 0) {
      throw new JikeJs.BaseError(JikeJs.Code['DEPT_NOT_EXISTS'])
    }
    await this.startTrans();
    //创建登录信息
    let { insertId } = await this.query(sqls.account.creater, { account_number:account,account_pwd:password, account_type: "student",_c:new Date().getTimeStamp(),account_name:name,account_gender:gender, dept_id: deptId });
    //创建学生信息
    let { insertId: insertId2 } = await this.query(sqls.student.creater, { account_id: insertId });
    if (!(insertId && insertId2)) {
      await this.rollback();
      return false;
    }
    await this.commit();
    return insertId;
  }
  /**
   * 删除学生
   */
  async del(ids) {
    if (ids.length == 0) {
      throw new JikeJs.BaseError(JikeJs.Code['NOT_CHANGE']);
    }
    await this.startTrans();
    //先删除
    let { affectedRows } = await this.query(sqls.student.del, ids);
    let { affectedRows: affectedRows2 } = await this.query(sqls.account.del + " and account_type='student'", ids);
    if (affectedRows >= 0 && affectedRows2 >= 0) {
      await this.commit();
      return true;
    }
    await this.rollback();
    return false;
  }
}