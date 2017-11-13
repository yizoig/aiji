import React from 'react'
import { Toast } from 'antd-mobile';
import { Control } from 'react-keeper';
import { Button } from '../../common';
import UserApi from '../../../sources/lib/services/user';
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
                let data = await UserApi.signIn(this.props.form.getFieldsValue());

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
            <div className="signIn">
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
                            onClick={this.onSubmit.bind(this)}>登录</Button>
                    </div>
                </div>
            </div>
        )
    }
}
export default createForm()(SignIn)