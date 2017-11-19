import React from 'react'
import { Button } from '../../common';
import NavBarPage from '../../common/NavBarPage';
import { Control } from 'react-keeper';
import { Toast, SegmentedControl, Picker } from 'antd-mobile';
import { createForm } from 'rc-form';
import AccountApi from '../../../sources/lib/services/account';
import DepartmentApi from '../../../sources/lib/services/department';
import GroupApi from '../../../sources/lib/services/group';
export default createForm()(
  class SignUp extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        depts: [],
        classes: [],
        type: "student"
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
        params['deptId'] = params['deptId'][0];
        try {

          let data;
          if (this.state.type = "student") {
            data = await AccountApi.studentSignUp(params);
          } else {
            data = await AccountApi.teacherSignUp(params);
          }
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
      await this.getGroupList();
    }
    async getDeptList() {
      let { list } = await DepartmentApi.list()
      let depts = [];
      for (let item of list) {
        let { id, name } = item;
        depts.push({ value: id, label: name });
      }
      this.setState({
        depts
      })
    }
    async getGroupList({ deptId } = {}) {
      let { list } = await GroupApi.list({ type: "class", deptId })
      let classes = [];
      for (let item of list) {
        let { id, name } = item;
        classes.push({ value: id, label: name });
      }
      this.setState({
        classes
      })
    }
    render() {
      const { getFieldProps, getFieldError } = this.props.form;
      const { depts, classes, type } = this.state;
      return (
        <NavBarPage title="注册"
        >
          <div className="signUp">
            <div className="main">
              <div className="form-group">
                <div className="form-item">
                  <SegmentedControl selectIndex={type == "student" ? 0 : 1} values={['学生', '教师']} style={{ width: 200, margin: "0 auto" }} onValueChange={(value) => {
                    this.setState({
                      type: value == "学生" ? "student" : "teacher"
                    })
                  }} />
                </div>
                <div className="form-item">
                  <Picker cols={1} data={depts} className="forss"
                    onOk={async ([value]) => {
                      console.log(value)
                      for (let item of depts) {
                        if (item['value'] == value) {
                          this.refs.dept.value = item['label']
                        }
                      }
                      await this.getGroupList({ deptId: value });
                    }}
                    {...getFieldProps('deptId', {
                      initialValue: [],
                      rules: [{
                        required: true,
                        message: "学院不能为空"
                      }]
                    }) }
                  >
                    <input placeholder="请选择学院" ref="dept" readOnly />
                  </Picker>
                </div>
                <div className="form-item" style={{ display: type == "student" ? "block" : "none" }}>
                  <Picker cols={1} data={classes} className="forss" disabled={type !== "student"} cascade
                    onOk={async ([value]) => {
                      console.log(value)
                      for (let item of depts) {
                        if (item['value'] == value) {
                          this.refs.dept.value = item['label']
                        }
                      }
                      await this.getGroupList({ deptId: value });
                    }}
                    {...getFieldProps('classId', {
                      initialValue: [],
                      rules: [{
                        required: true,
                        message: "班级不能为空"
                      }]
                    }) }>
                    <input placeholder="请选择班级" ref="class" readOnly />
                  </Picker>
                </div>
                <div className="form-item">
                  <input placeholder="真实姓名" {...getFieldProps('name', {
                    initialValue: "",
                    rules: [{
                      required: true,
                      message: "姓名不能为空"
                    }]
                  }) } />
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