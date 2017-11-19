import React from 'react';
import './index.less';
import { Toast } from 'antd-mobile';
import { Control,Link } from 'react-keeper';
import { Button } from '../../common';
import AccountApi from '../../../sources/lib/services/account';
import { createForm } from 'rc-form';
import cache from '../../../sources/lib/cache';
class SignIn extends React.Component {

  constructor(props) {
    super(props);
    cache.local.getItem("access-token") && Control.go('/home');
  }
  onSubmit() {
    Toast.loading("登录中")
    this.props.form.validateFields(async (error, value) => {

      if (error) {
        for (let key in error) {
          Toast.info(this.props.form.getFieldError(key)[0])
          return;
        }
      }
      try {
        let data = await AccountApi.signIn(this.props.form.getFieldsValue());
        //保存用户数据
        localStorage.setItem("userInfo",JSON.stringify(data))
        Toast.success("登录成功");
        setTimeout(() => {
          Control.go('/home');
        }, 3000);
      } catch (e) {
        Toast.fail(e.message)
      }
    });
  }
  render() {
    const { getFieldProps, getFieldError } = this.props.form;
    return (
      <div className="sign">
        <div className="main-body">
          <div className="header">
            <h1 className="logo"></h1>
            <h2 className="sub-title">为您更好的收集信息</h2>
          </div>

          <div className="main">
            <div className="signIn">
              <div className="form-group">
                <div className="form-item">
                  <input placeholder="学号/教师职工号/管理员帐号" {...getFieldProps('account', {
                    initialValue: "",
                    rules: [{
                      required: true,
                      message: "账号不能为空"
                    }]
                  }) } />
                </div>
                <div className="form-item">
                  <input type="password" placeholder="密码"{...getFieldProps('password', {
                    initialValue: "",
                    rules: [{
                      required: true,
                      message: "密码不能为空"
                    }]
                  }) } />
                </div>
                <div className="form-item">
                  <Button
                    type="primary"
                    className="yizo-btn"
                    onClick={this.onSubmit.bind(this)}>登录</Button>
                    <Link to="/signUp" style={{color:"#108ee9",display:"inline-block",width:"100%",marginTop:20}} className="yizo-btn">注册</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default createForm()(SignIn)