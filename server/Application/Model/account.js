

module.exports = class extends JikeJs.Model {
  /**
   * 登录
   */
  async signIn({ account, password }) {

    let [data = null] = await this.query("select account_id as id,type,_c,_d from account where account = ? and password = ?", account, password);
    if (data == null) {
      throw new JikeJs.BaseError(JikeJs.Code['PASSWORD_ERR']);
    }
    if (data['_d'] == 1) {
      throw new JikeJs.BaseError(JikeJs.Code['ACCOUNT_DISABLE']);
    }
    //根据身份获取信息
    return data;
  }
  /**
   * 修改密码
   */
  async setPwd({ id, password }) {

    let { affectedRows } = await this.query(sqls.account.update + " where account_id=?", { password }, id)

    return affectedRows > 0;
  }
  /**
   * 旧密码修改
   */
  async updatePwd({ id, oldPwd, newPwd }) {
    let { affectedRows } = await this.query(sqls.account.update + " where account_id=? and password =?", { password: oldPwd }, newPwd, id)
    return affectedRows > 0;
  }
}