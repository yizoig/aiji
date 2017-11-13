import React from 'react'
import './index.less'
import { Button } from 'antd-mobile';
import TabularApi from '../../../sources/lib/services/tabular';
import NavBarPage from '../../common/NavBarPage';
import api from '../../../sources/config/api'
import { Icon } from '../../common';
import { Toast } from 'antd-mobile';

export default class TabularData extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            page: {
                page: 1,
                pageSize: 10
            }
        }
    }
    async componentWillMount() {
        await this.loadData();
    }
    async loadData({ refresh = false } = {}) {
        try {
            let { tid } = this.props.params;
            let { page, data } = this.state;
            if (refresh) {
                page = {
                    page: 1,
                    pageSize: page['pageSize']
                }
            }
            if (page['count'] && page['count'] <= data.length) {
                return;
            }
            Toast.loading("获取数据中...");
            let { fields, list, count: total } = await TabularApi.data({ tid, needPage: true, page: page['page'], pageSize: page['pageSize'] });
            let showFields = {};
            for (let i = 0; i < fields.length; i++) {
                showFields[fields[i]['id']] = fields[i]['field_name'];
            }
            if (refresh) {
                data = [];
            }
            data.push.apply(data, list)
            page['page']++;
            page['count'] = total;
            this.setState({
                showFields,
                fields, data, total
            })
            if (list.length == 0) {
                Toast.info("没有数据")
            } else {
                Toast.hide();
            }

        } catch (e) {
            console.log(e);
            Toast.fail("获取数据失败");
        }
    }
    render() {

        const { fields, data, showFields = {}, total = 0 } = this.state;
        let { tid } = this.props.params;
        return (
            <NavBarPage title="数据"
                rightContent={[<a href={api.host + `/tabular/${tid}/excel`} style={{ color: '#fff' }}>数据下载</a>]}
            >
                <div className="top">
                    <button >显示字段</button>
                    <div>已收集{total}份数据</div>
                </div>
                <div className="list-content">
                    {fields && data && (
                        <table className="table" style={{ width: document.body.clientWidth }}>
                            <thead>
                                <tr>
                                    <th>序号</th>
                                    {Object.keys(showFields).map((key) => {
                                        return (
                                            <th key={key}>{showFields[key]}</th>
                                        )
                                    })}
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            {Object.keys(showFields).map((key) => {
                                                return (
                                                    <td key={key}>{item[key]}</td>
                                                )
                                            })}
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    )}
                </div>
                <div className="load-more" onClick={() => this.loadData()}>
                    {total && data.length >= total ? '没有更多了' : '加载更多'}
                </div>
                <div className="refresh" onClick={async () => {
                    this.setState({
                        data: []
                    })
                    await this.loadData({ refresh: true });
                }}>
                    <Icon type="refresh" />
                </div>
            </NavBarPage>
        )
    }
}