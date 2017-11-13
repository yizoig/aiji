import React from 'react'
import { List, Toast, Button } from 'antd-mobile'
import { Control, Link } from 'react-keeper'
import './index.less';
import NavBarPage from '../../common/NavBarPage';
import { createForm } from 'rc-form';
import UserApi from '../../../sources/lib/services/user';
export default createForm()(
    class UpdatePassword extends React.Component {

        constructor(props) {
            super(props);

        }
        async onSubmit() {

            Toast.loading("修改中")
            this.props.form.validateFields(async (error, value) => {
    
                if (error) {
                    for (let key in error) {
                        Toast.info(this.props.form.getFieldError(key)[0])
                        return;
                    }
                }
                try {
                    let data = await UserApi.updatePwd({id:UserApi.getId(),...this.props.form.getFieldsValue()});


                    if(!data){
                        throw new Error("修改失败")
                    }
                    Toast.success("修改成功");
                    setTimeout(() => {
                        Control.go(-1);
                    }, 1000);
                } catch (e) {
                    Toast.fail(e.message)
                }
            });
        }
        render() {
            const { getFieldProps, getFieldError } = this.props.form;
            return (
                <NavBarPage title="修改密码">
                    <div className="main">
                        <div className="form-group">
                            <div className="form-item">
                                <input type="password" placeholder="旧密码" autoComplete={'off'} {...getFieldProps('password', {
                                    initialValue: "",
                                    rules: [{
                                        required: true,
                                        message: "旧密码不能为空"
                                    }]
                                }) } />
                            </div>
                            <div className="form-item">
                                <input type="password" placeholder="新密码"  autoComplete={'off'} {...getFieldProps('newPassword', {
                                    initialValue: "",
                                    rules: [{
                                        required: true,
                                        message: "新密码不能为空"
                                    }]
                                }) } />
                            </div>
                            <div className="form-item">
                                <Button
                                    type="primary"
                                    onClick={this.onSubmit.bind(this)}>重置密码</Button>
                            </div>
                        </div>
                    </div>
                </NavBarPage>
            )
        }
    }
)