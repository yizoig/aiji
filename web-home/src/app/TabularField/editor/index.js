import React from 'react'
import './index.less'
import { List, InputItem, Toast, Modal, Switch, TextareaItem } from 'antd-mobile';
import NavBarPage from '../../common/NavBarPage';
import TabularApi from '../../../sources/lib/services/tabular';
import {  Control } from 'react-keeper';
import { createForm } from 'rc-form';
export default createForm()(
    class TabularFieldEditor extends React.Component {


        constructor(props) {
            super(props);
            let { tid, fid } = this.props.params;
            this.state = {
                tid,
                fid,
                data:{
                    required:true
                }
            }
        }
        async componentWillMount() {
            if('fid' in this.props.params){
                await this.loadData()
            }
        }
        async loadData() {
            try {
                Toast.loading("获取信息中...");
                const {tid,fid} = this.state;
                let { fields = [] } = await TabularApi.info({ id:tid });
                for (let item of fields) {
                    if (item['id'] == fid) {
                        item['required'] = item['required']=='0'?true:false;
                        this.setState({
                            data: item
                        });
                        Toast.hide();
                        return;
                    }
                }

            } catch (e) {
                Toast.fail(e.message)
            }
        }
        async submit(){

            const {data,tid,fid} = this.state;
         
            this.props.form.validateFields(async (error, value) => {
                if (error) {
                    for (let key in error) {
                        Toast.info(this.props.form.getFieldError(key)[0])
                        return;
                    }
                }
                Toast.loading('fid' in this.props.params ? "修改中..." : "添加中...")
                let params =  this.props.form.getFieldsValue()
                params['required'] = params['required']=='0'?true:false;
                let result;
                try{
                    if('fid' in this.props.params){
                        //编辑
                        result =await TabularApi.updateField({tid,fid,...params});
                    }else{
                        //添加
                        result =await TabularApi.addField({id:tid,field_type:'input',...params});
                    }
                    if(!result){
                        Toast.fail('fid' in this.props.params ? "修改失败" : "添加失败")
                    }
                    Toast.success('fid' in this.props.params ? "修改成功" : "添加成功")
                    setTimeout(()=>{
                        Control.go(-1);
                    })
                }catch(e){
                    Toast.fail(e.message)
                }
            });
            
        }
        render() {

            const { data={} } = this.state;
            console.log(data);
            const { getFieldProps } = this.props.form;
            return (
                <NavBarPage title={'fid' in this.props.params ? "编辑字段" : "添加字段"}>
                    {(!('fid' in this.props.params) || this.state.data) && <List renderHeader={() => 'fid' in this.props.params ? "编辑字段" : "添加字段"}>
                        <InputItem
                            {...getFieldProps('field_name',{
                                initialValue:data['field_name']||''
                            }) }
                            clear
                            placeholder="字段名(必填) （如：姓名，性别等）"
                        >字段名</InputItem>
                        <TextareaItem
                            {...getFieldProps('explanation',{
                                initialValue:data['explanation']||''
                            }) }
                            clear
                            placeholder="字段描述（必填）"
                            title="字段描述"
                            autoHeight
                        />
                        <InputItem
                            {...getFieldProps('default_value',{
                                initialValue:data['default_value']||''
                            }) }
                            clear
                            placeholder="默认值(选填)"

                        >默认值</InputItem>
                        <List.Item
                            extra={<Switch
                                {...getFieldProps('required', {
                                    initialValue: data['required'],
                                    valuePropName: 'checked',
                                }) }
                                onClick={(checked) => { console.log(checked); }}
                            />}
                        >是否必填</List.Item>
                        <List.Item>
                            <div
                                style={{ width: '100%', color: '#108ee9', textAlign: 'center' }}
                                onClick={this.submit.bind(this)}
                            >
                            {'fid' in this.props.params ? "编辑" : "添加"}
                          </div>
                        </List.Item>
                    </List>
                    }
                </NavBarPage>
            )
        }
    }
)