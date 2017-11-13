import React from 'react'
import './index.less'
import { NavBar, ListView, InputItem, Toast, Modal, RefreshControl } from 'antd-mobile';
import { Icon } from '../../common';
import TabularApi from '../../../sources/lib/services/tabular'
import { Link, Control } from 'react-keeper';
/**
 *  -2 管理员取消
 * -1 创建人取消
 * 0 未发布  创建
 * 1 进行中
 * 2 完成
 * RefreshControl
 */
const alert = Modal.alert;
export default class TabularList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showToolBarIndex: null,
            data: [],
            page:{
                page:1,
                pageSize:5
            }
        }
    }
    async componentWillMount() {
        await this.loadData();
    }
    getIndexById(id) {
        const { data } = this.state;
        for (let key in data) {
            if (data[key]['id'] == id) {
                return key;
            }
        }
    }
    async updateStatus({ status, id }) {

        alert('确定操作吗？', status == 1 ? '确认发布此表单吗' : '暂停后答题者不能提交数据，确认操作吗??', [
            { text: 'Cancel', onPress: () => console.log('cancel'), style: 'default' },
            {
                text: 'OK', onPress: async () => {
                    let { data } = this.state;
                    try {
                        Toast.loading(status == 1 ? "发布中..." : "暂停中...");
                        let result = await TabularApi.update({ status, id });
                        if (!result) {
                            throw new Error(status == 1 ? "发布失败" : "操作失败");
                        }
                        let index = this.getIndexById(id);
                        data[index] = { ...data[index],status }
                        this.setState({
                            data
                        })
                        Toast.success(status == 1 ? "发布成功" : "操作成功");
                        if (status == 1) {
                            await this.share(id)
                        }
                    } catch (e) {
                        console.log(e);
                        Toast.fail(e.message);
                    }

                }
            },
        ]);

    }
    //删除
    async delete(id) {
        let { data, showToolBarIndex } = this.state;
        try {
            Toast.loading("删除中...");
            let result = await TabularApi.delete({ ids: id + '' });
            if (!result) {
                throw new Error("删除失败");
            }
            delete data[showToolBarIndex];
            this.setState({
                data
            })
            Toast.hide();
        } catch (e) {
            console.log(e);
            Toast.fail("获取数据失败");
        }
    }
    async loadData({refresh=false}={}) {
        try {
            let {page,data} = this.state;
            if(refresh){
                page = {
                    page:1,
                    pageSize:page['pageSize']
                }
            }
            if(page['count'] && page['count']<=data.length){
                return ;
            }
            Toast.loading("获取数据中...");
            let { list: result ,count} = await TabularApi.list({needPage:true,page:page['page'],pageSize:page['pageSize']});
            if(refresh){
                data = [];
            }
            data.push.apply(data,result)
            page['page']++;
            page['count'] = count;
            this.setState({
                page,
                data
            })
            if (data.length == 0) {
                Toast.info("没有数据")
            } else {
                Toast.hide();
            }

        } catch (e) {
            console.log(e);
            Toast.fail("获取数据失败");
        }
    }
    async share(id) {
        Control.go(`/tabular/${id}/publish`,{
            share:true
        })
    }
    render() {
        const { showToolBarIndex, data ,page:{count}} = this.state;
        return (
            <div className="list" >
                <div className="refresh" onClick={async () => {
                    this.setState({
                        data: []
                    })
                    await this.loadData({refresh:true});
                }}>
                    <Icon type="refresh" />
                </div>
                {data.map((item, index) => {
                    return (
                        <div className="item" key={index}>
                            <div className="content" onClick={() => {
                                this.setState({
                                    showToolBarIndex: showToolBarIndex == index ? null : index
                                })
                            }}>
                                <div className="title">
                                    {item.title}
                                    <div className="time">{item.start_time}</div>
                                </div>

                                <div className="desc">{item.explanation}</div>
                                {(() => {
                                    switch (item.status) {
                                        case -1:
                                        case -2: {
                                            return <div className="status" style={{ backgroundColor: "#f00" }}>已取消</div>;
                                        }
                                        case 0: {
                                            return <div className="status" style={{ backgroundColor: "#ffa60b" }}>未发布</div>;
                                        }
                                        case 1: {
                                            return <div className="status" style={{ backgroundColor: "#68bb47" }}>收集中</div>;
                                        }
                                        case 2: {
                                            return <div className="status">已完成</div>;
                                        }
                                    }
                                })()}
                                <div className="bottom">
                                    <div className="item">
                                        数量:{item.total || 0}份
                        </div>
                                </div>
                            </div>

                            {showToolBarIndex == index && (
                                <div className="tool-bar" >
                                    <a className="tool-item" onClick={this.updateStatus.bind(this, { id: item.id, status: item.status == 0 ? 1 : 0 })}>
                                        <Icon type="start-circle-o" />
                                        < p >{item.status == 0 ? '发布' : '暂停'}</p>
                                    </a>
                                    <Link className="tool-item" to={`/tabular/${item.id}/field/list`}>
                                        <Icon type="editor-circle-o" />
                                        <p>编辑</p>
                                    </Link>
                                    <Link className="tool-item" to={`/tabular/${item.id}/data`}>
                                        <Icon type="data-circle-o" />
                                        <p>数据</p>
                                    </Link>
                                    <a className="tool-item" onClick={async () => {
                                        if (item.status == 0) {
                                            await this.updateStatus({ status: 1, id: item.id })
                                        } else {
                                            await this.share(item.id)
                                        }

                                    }}>
                                        <Icon type="share-circle-o" />
                                        <p>分享</p>
                                    </a>
                                    <a className="tool-item" onClick={() => {
                                        alert('确定删除吗？', '确认删除此表单吗?', [
                                            { text: 'Cancel', onPress: () => console.log('cancel'), style: 'default' },
                                            {
                                                text: 'OK', onPress: () => {
                                                    this.delete(item.id)
                                                }
                                            },
                                        ]);

                                    }}>
                                        <Icon type="del-circle-o" />
                                        <p>删除</p>
                                    </a>
                                </div>
                            )}
                        </div>
                    )
                })}
                <div className="load-more" onClick={()=>this.loadData()}>
                    {count && data.length>=count?'没有更多了':'加载更多'}
                </div>
            </div>
        )
    }
}