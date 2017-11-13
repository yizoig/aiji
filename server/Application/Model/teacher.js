

module.exports = class extends JikeJs.Model {
  /**
   * 获取所有的教师
   */
  async list({ page, everyPage, searchKey, dept }) {

    let args = [];
    let whereArr = [];
    if (searchKey) {
      whereArr.push("(account like ? or name like ?)")
      args.push(`%${searchKey}%`, `%${searchKey}%`);
    }
    if (dept) {
      whereArr.push("(department.dept_id = ?)")
      args.push(dept);
    }
    //查询条数
    let [{ total }] = await this.query(sqls.teacher.total + (whereArr.length > 0 ? (" where " + whereArr.join("and")) : ""), ...args);
    let list = [];
    if (total > 0) {
      args.push(page * everyPage, everyPage);
      list = await this.query(sqls.teacher.list + (whereArr.length > 0 ? (" where " + whereArr.join("and")) : "") + " limit ?,?", ...args);
    }
    return {
      everyPage,
      total,
      list
    }
  }
  /**
   * 创建教师
   */
  async creater({ account, password, name, gender, dept }) {

    //先查看。账户是否存在
    let [{ total }] = await this.query(sqls.account.total + " where account = ?", account);
    if (total > 0) {
      throw new JikeJs.BaseError(JikeJs.Code['ACCOUNT_EXISTS']);
    }
    //判断系是否存在
    [{ total }] = await this.query(sqls.department.total + " where dept_id=?", dept);
    if (total == 0) {
      throw new JikeJs.BaseError(JikeJs.Code['DEPT_NOT_EXISTS']);
    }
    await this.startTrans();
    //创建登录信息
    let { insertId } = await this.query(sqls.account.creater, { account, password, name, gender, type: "teacher" });
    //创建教师信息
    let { insertId: insertId2 } = await this.query(sqls.teacher.creater, { account_id: insertId, dept_id: dept });
    if (!(insertId && insertId2)) {
      await this.rollback();
      return false;
    }
    await this.commit();
    return insertId;
  }
  /**
   * 修改教师信息
   */
  async update(id, data) {
    //过滤参数  判断是否为空
    data = this.filter(data);
    if (Object.keys(data).length == 0) {
      throw new JikeJs.BaseError(JikeJs.Code['NOT_CHANGE']);
    }
    let { dept } = data;
    if (dept) {
      //判断系是否存在
      [{ total }] = await this.query(sqls.department.total + " where dept_id=?", dept);
      if (total > 0) {
        throw new JikeJs.BaseError(JikeJs.Code['DEPT_NOT_EXISTS'])
      }
    }
    let { affectedRows } = await this.query(sqls.teacher.update, { dept_id: dept }, { account_id: id });
    return affectedRows > 0;
  }
  /**
   * 删除教师
   */
  async del(ids) {
    if (ids.length == 0) {
      throw new JikeJs.BaseError(JikeJs.Code['NOT_CHANGE']);
    }
    await this.startTrans();
    //先删除
    let { affectedRows } = await this.query(sqls.teacher.del, ids);
    let { affectedRows: affectedRows2 } = await this.query(sqls.account.del + " and type='teacher'", ids);
    if (affectedRows >= 0 && affectedRows2 >= 0) {
      await this.commit();
      return true;
    }
    await this.rollback();
    return false;
  }
}