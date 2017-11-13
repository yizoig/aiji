import React from 'react'
import './index.less'
import { List, InputItem, Toast,Modal } from 'antd-mobile';
import { Link, Control } from 'react-keeper';
import NavBarPage from '../../common/NavBarPage';
import { Icon } from '../../common';
import QuestTypeList from '../../questionType/list';
import TabularApi from '../../../sources/lib/services/tabular'
export default class TabularFieldList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentItem: null,
            data: null,
            typeListShow: false
        }

    }
    async componentWillMount() {
        await this.loadData()
    }
    async loadData() {
        try {
            Toast.loading("获取信息中...");
            let { tid:id } = this.props.params;
            let data = await TabularApi.info({ id });
            this.setState({
                data
            });
            Toast.hide();
        } catch (e) {
            Toast.fail(e.message)
        }
    }
    async delField() {

        try{
            Toast.loading("删除中...");
            let { currentItem,data } = this.state;
            let  { fields,id } = data;
            //删除字段
            console.log(currentItem,fields[currentItem])
            let result = await TabularApi.deleteField({id,ids:fields[currentItem]['id']})
            if (!result) {
                throw new Error("删除失败");
            }
            fields.splice(currentItem, 1);
            this.setState({
                data:{...data,fields},
                currentItem: null
            })
            Toast.success("删除成功");
        }catch(e){
            Toast.fail(e.message);
        }
    }
    async shiftField(type) {
        const { currentItem, data } = this.state;
        let { fields, id } = data;
        let index = type == "down" ? (currentItem + 1) : (currentItem - 1);
        if (currentItem >= 0 && currentItem < fields.length && index >= 0 && index < fields.length) {
            try {
                Toast.loading("移动中...");
                let result = await TabularApi.sortField({ id:id, field_id: fields[currentItem]['id'], type });
                if (!result) {
                    throw new Error("移动失败");
                }
                //移动数据
                fields[index]['sort_id'] = currentItem;
                fields[currentItem]['sort_id'] = index;
                let d = fields[index];
                fields[index] = fields[currentItem];
                fields[currentItem] = d;
                console.log()
                this.setState({
                    data: { ...data, fields },
                    currentItem: index
                })
                Toast.hide();
            } catch (e) {
                Toast.fail(e.message)
            }
        }
    }
    render() {
        const { currentItem, data, typeListShow, } = this.state;
        const {tid} = this.props.params;
        const { title, explanation, fields = [] } = data || {};
        return (
            <NavBarPage title="编辑表单" onLeftClick={()=>{
                Control.go('/home')
            }}>
                {this.state.data && (
                    <div className="tabular-editor">
                    <div className="tabular-mes" onClick={()=>{
                        Control.go(`/tabular/${tid}/editor`,data)    
                    }}>
                        <div className="title">{title}</div>
                        <div className="desc">{explanation}</div>
                    </div>
                    <div className="quest-list">
                        {fields.map((item, index) => {
                            return (
                                <div className="quest-item" key={index + ""}>
                                    <div className="mes" onClick={() => {
                                        this.setState({
                                            currentItem: currentItem == index ? null : index
                                        })
                                    }} >
                                        <div className="left">
                                            <span className="number">{index + 1}.</span>
                                            <span className="name">{item.field_name}</span>
                                        </div>
                                        <Icon type="expand" color="#999999" />
                                    </div>
                                    {currentItem == index && (
                                        <div className="tool-bar">
                                            <div className="tool-item" onClick={()=>{
                                                Control.go(`tabular/${tid}/field/editor/${data.fields[currentItem]['id']}`,data.fields[currentItem])
                                                }}>
                                                <Icon type="editor-circle-o" />
                                                <span>编辑</span>
                                            </div>
                                            <div
                                                className={"tool-item " + (currentItem > 0 ? "" : 'disabled')}
                                                onClick={this.shiftField.bind(this, 'up')}>
                                                <Icon type="shift-up-o" />
                                                <span>上移</span>
                                            </div>
                                            <div
                                                className={"tool-item " + (currentItem < fields.length - 1 ? "" : 'disabled')}
                                                onClick={this.shiftField.bind(this, 'down')}>
                                                <Icon type="shift-down-o" />
                                                <span>下移</span>
                                            </div>
                                            <div className="tool-item" onClick={this.delField.bind(this)}>
                                                <Icon type="del-circle-o" />
                                                <span>删除</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                    <div className="add-question" onClick={() => this.setState({ typeListShow: !typeListShow })}>
                        <Icon type="add-circle-o" color="#108ee9" />
                        <span>添加选项</span>
                    </div>
                </div>
                )}
                {typeListShow && <QuestTypeList tid={tid} onClose={() => this.setState({ typeListShow: false })} />}
            </NavBarPage>
        )
    }
}