import React from 'react'
import './index.less'
import '../Sign/index.less'
import { TabBar, NavBar } from 'antd-mobile';
import { Link } from 'react-keeper';
import TabularList from '../Tabular/list';
import { Icon } from '../common';
import Mine from '../Mine';
export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'tabular',
            topPopup: false,
        };
    }
    renderContent(key) {
        switch (key) {
            case "tabular": {
                return <TabularList />
            }
            case "mine": {
                return <Mine />
            }
        }
    }
    render() {

        const { topPopupShow } = this.state;
        return (
            <div className="home">
                <header className="nav-bar">
                    <div className="left"></div>
                    <div className="title">爱集</div>
                    <div className="right" onClick={() => {
                        this.setState({
                            topPopupShow: true
                        })
                    }}>
                        <Icon type="add" />
                    </div>
                </header>
                <div className="popup" style={{ display: topPopupShow ? 'block' : 'none' }} onClick={() => {
                    this.setState({
                        topPopupShow: false
                    })
                }}>
                    <div className="popup-innner">
                        <div className="popup-item">
                            <Link to="/tabular/create" state={{type:'create'}}>创建表单</Link>
                        </div>
                        {/* <div className="popup-item">
                            <Link to="#">创建问卷</Link>
                        </div> */}
                    </div>
                </div>
                <TabBar
                    unselectedTintColor="#949494"
                    tintColor="#33A3F4"
                    barTintColor="white"
                >
                    <TabBar.Item
                        icon={<Icon type="tabular" />}
                        selectedIcon={<Icon type="tabular" />}
                        title="表单"
                        key="tabular"
                        selected={this.state.selectedTab === 'tabular'}
                        onPress={() => {
                            this.setState({
                                selectedTab: 'tabular',
                            });
                        }}
                    >
                        {this.renderContent('tabular')}
                    </TabBar.Item>
                    <TabBar.Item
                        icon={<Icon type="mine" />}
                        selectedIcon={<Icon type="mine" />}
                        title="我的"
                        key="mine"
                        selected={this.state.selectedTab === 'mine'}
                        onPress={() => {
                            this.setState({
                                selectedTab: 'mine',
                            });
                        }}
                    >
                        {this.renderContent('mine')}
                    </TabBar.Item>
                </TabBar>
            </div>

        )
    }
}