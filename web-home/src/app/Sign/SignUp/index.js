import React from 'react'
import { Button } from '../../common';
import NavBarPage from '../../common/NavBarPage';
import { Control } from 'react-keeper';
import { Toast, SegmentedControl, Picker } from 'antd-mobile';

import UserApi from '../../../sources/lib/services/user';
import DepartmentApi from '../../../sources/lib/services/department';
import { createForm } from 'rc-form';
export default createForm()(
  class SignUp extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        depts: []
      }
    }
    onSubmit() {
      Toast.loading("注册中")
      this.props.form.validateFields(async (error, value) => {
        if (error) {
          for (let key in error) {
            Toast.info(this.props.form.getFieldError(key)[0])
            return;
          }
        }
        let params = this.props.form.getFieldsValue();
        if (params['password'] !== params['repeatPassword']) {
          Toast.fail("两次密码不一致");
          return;
        }
        // delete params['repeatPassword'];
        try {
          let data = await UserApi.signUp(params);
          Toast.success("注册成功");
          setTimeout(() => {
            Control.go('/home');
          }, 3000);
        } catch (e) {
          Toast.fail(e.message)
        }
      });

    }
    async componentWillMount() {
      await this.getDeptList();
    }
    async getDeptList() {
      let { list } = await DepartmentApi.list()
      let depts = [];
      for (let item of list) {
        let { dept_id, dept_name } = item;
        depts.push({ value: dept_id, label: dept_name });
      }
      this.setState({
        depts
      })
    }
    render() {
      const { getFieldProps, getFieldError } = this.props.form;
      const { depts } = this.state;
      return (
        <NavBarPage title="注册"
        >
          <div className="signUp">
            <div className="main">
              <div className="form-group">
                <div className="form-item">
                  <SegmentedControl values={['学生', '教师']} style={{ width: 200, margin: "0 auto" }} />
                </div>
                <div className="form-item">
                  <Picker cols={1} data={depts} className="forss" onChange={(value) => {

                    for (let item of depts) {
                      if(item['value']==value){
                        this.refs.dept.value = item['label']
                      }
                    }
                  }}>
                    <input placeholder="请选择学院" ref="dept" />
                  </Picker>
                </div>
                <div className="form-item">
                  <input placeholder="账号" {...getFieldProps('account', {
                    initialValue: "",
                    rules: [{
                      required: true,
                      message: "账号不能为空"
                    }]
                  }) } />
                </div>
                <div className="form-item">
                  <input placeholder="密码" type="password" {...getFieldProps('password', {
                    initialValue: "",
                    rules: [{
                      required: true,
                      message: "密码不能为空"
                    }]
                  }) } />
                </div>
                <div className="form-item">
                  <input placeholder="重复密码" type="password" {...getFieldProps('repeatPassword', {
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
                    onClick={this.onSubmit.bind(this)}>注册</Button>
                </div>
              </div>
            </div>
          </div>
        </NavBarPage>
      )
    }
  }
)