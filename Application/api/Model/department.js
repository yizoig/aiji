/// <reference path="../../../typings/globals/JikeJs/index.d.ts" />
module.exports = class extends JikeJs.Model {

  /**
   * 获取所有的系
   */
  async list({ page, everyPage, searchKey }) {

    let totalSql = "select count(*) as total from department";
    let sql = "select * from department";
    let args = [];
    if (searchKey) {
      totalSql += " where dept_name like ?";
      sql += " where dept_name like ?";
      args.push(`%${searchKey}%`);
    }
    //查询总数
    let [{ total }] = await this.query(totalSql, ...args);
    let list = [];
    if (total > 0) {
      //设置limit
      sql += " limit ?,?";
      args.push(page * everyPage, everyPage);
      list = await this.query(sql, ...args);
    }
    return {
      everyPage,
      total,
      list
    }
  }
  /**
   * 添加所有的系
   */
  async creater({ name: dept_name }) {
    //判断是否有重名
    let [{total}] = await this.query("select count(*) as total from department where dept_name=?",dept_name);
    if(total>0){
      throw new JikeJs.BaseError(JikeJs.Code['DEPT_NAME_REAPT']);
    }
    let { insertId } = await this.query(sqls.department.creater, { dept_name });
    return insertId;
  }
  /**
   * 修改系信息
   */
  async update(id,data){
    
    data = this.filter(data);
    if(Object.keys(data).length==0){
      throw new JikeJs.BaseError(JikeJs.Code['NOT_CHANGE']);
    }
    console.log(data,'----')
    let {name} = data;
    let {affectedRows} = await this.query(sqls.department.update,{dept_name:name},{dept_id:id});
    return affectedRows>0;
  }
  /**
   * 删除系
   */
  async del(ids){
    if(ids.length==0){
      throw new JikeJs.BaseError(JikeJs.Code['NOT_CHANGE']);
    }
    //先删除
    let {affectedRows} = await this.query(sqls.department.del,ids);
    return affectedRows>0;
  }
}