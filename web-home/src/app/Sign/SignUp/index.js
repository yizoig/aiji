import React from 'react'
import { Button } from '../../common';
import { Control } from 'react-keeper';
import { Toast } from 'antd-mobile';
import UserApi from '../../../sources/lib/services/user';
import { createForm } from 'rc-form';
export default createForm()(
    class SignUp extends React.Component {
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
        render() {
            const { getFieldProps, getFieldError } = this.props.form;
            return (
                <div className="SignUp">
                    <div className="form-group">
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
            )
        }
    }
)