import React from 'react'
import './index.less'
import { List, InputItem, Toast, DatePicker } from 'antd-mobile';
import { Link, Control } from 'react-keeper';
import NavBarPage from '../../common/NavBarPage';
import { createForm } from 'rc-form';
import TabularApi from '../../../sources/lib/services/tabular';
export default createForm()(
    class TabularEditor extends React.Component {
        constructor(props) {
            super(props);
            let { ...data = {} } = Control.state;
            data['end_time'] = new Date(data['end_time'] || null)
            this.state = {
                data
            }
        }
        async componentWillMount() {
            if('tid' in this.props.params){
                await this.loadData()
            }
        }
        async loadData() {
            try {
                Toast.loading("获取信息中...");
                let { tid:id } = this.props.params;
                let data = await TabularApi.info({ id });
                data['required'] = data['required']==0?true:false;
                this.setState({
                    data
                });
                Toast.hide();
            } catch (e) {
                Toast.fail(e.message)
            }
        }
        async submit() {
            const { type, data } = this.state;
            Toast.loading('tid' in this.props.params ? "修改中" : "创建中")
            this.props.form.validateFields(async (error, value) => {
                if (error) {
                    for (let key in error) {
                        Toast.info(this.props.form.getFieldError(key)[0])
                        return;
                    }
                }
                let params = this.props.form.getFieldsValue();
                params['required'] = params['required']==0?true:false;
                try {
                    if ('tid' in this.props.params) {
                        Toast.loading("修改中...")
                        let result = await TabularApi.update({ id: data.id, ...params});
                        if (!result) {
                            throw new Error("修改失败")
                        }
                        Toast.success("修改成功");
                        setTimeout(() => {
                            Control.go(-1)
                        }, 1000);
                    } else {
                        Toast.loading("创建中...")
                        let result = await TabularApi.add(params);
                        if (!result) {
                            throw new Error("创建失败")
                        }
                        Toast.success("创建成功");
                        Control.go(`/tabular/${result}/field/list`,)
                    }
                } catch (e) {
                    Toast.fail(e.message)
                }
            });
        }
        onOk = (date) => {
            console.log('onOk', date);
        }
        render() {
            const { getFieldProps, getFieldError } = this.props.form;
            const { data } = this.state;
            console.log(data)
            return (
                <NavBarPage title={'tid' in this.props.params ? '修改表单' : '创建表单'}>
                    <List >
                        <InputItem
                            clear
                            placeholder="标题"
                            {...getFieldProps('title', {
                                initialValue: data.title || "",
                                rules: [{
                                    required: true,
                                    message: "标题不能为空"
                                }]
                            }) }
                            autoFocus
                        >标题</InputItem>
                        <InputItem
                            clear
                            placeholder="备注"
                            {...getFieldProps('explanation', {
                                initialValue: data.explanation || ""
                            }) }
                        >备注</InputItem>
                        {/* <DatePicker mode="datetime"
                        onOk={()=>{

                        }}
                            {...getFieldProps('end_time', {
                            initialValue: data.end_time,
                            rules: [
                              { required: true, message: '请选择截止时间' },
                            ],
                          })}
                        >
                            <List.Item arrow="horizontal">截止时间</List.Item>
                        </DatePicker> */}
                        <List.Item>
                            <div
                                style={{ width: '100%', color: '#108ee9', textAlign: 'center' }}
                                onClick={this.submit.bind(this)}
                            >
                                {'tid' in this.props.params ? "修改" : "创建"}
                            </div>
                        </List.Item>
                    </List>
                </NavBarPage>
            )
        }
    }
)