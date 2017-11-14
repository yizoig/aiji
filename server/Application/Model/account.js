

module.exports = class extends JikeJs.Model {
  /**
   * 登录
   */
  async signIn({ account, password }) {

    let [data = null] = await this.query(sqls.account.signIn, account, password);
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

    let { affectedRows } = await this.query(sqls.account.update + " where account_id=?", { account_pwd:password }, id)

    return affectedRows > 0;
  }
  /**
   * 旧密码修改
   */
  async updatePwd({ id, oldPwd, newPwd }) {

    let { affectedRows } = await this.query(sqls.account.update + "  and account_pwd =?", { account_pwd: newPwd }, id,oldPwd)
    return affectedRows > 0;
  }
  /**
   * 修改基本信息
   */
  async updateBaseinfo(id,data){
      //过滤参数  判断是否为空
      data = this.filter(data);
      if (Object.keys(data).length == 0) {
        throw new JikeJs.BaseError(JikeJs.Code['NOT_CHANGE']);
      }
      let {name,gender} = data;
      let { affectedRows } = await this.query(sqls.account.update,{account_name:name,account_gender:gender},id);
      return affectedRows > 0;
  }
}