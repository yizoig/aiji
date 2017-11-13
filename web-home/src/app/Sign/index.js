import React from 'react'
import './index.less'
import { Button } from '../common';
import cache from '../../sources/lib/cache';
import { Route, Control } from 'react-keeper'
import SignIn from './SignIn';
import SignUp from './SignUp';
const navs = [
    {
        key: 'signIn',
        name: '登录'
    },
    {
        key: 'signUp',
        name: '注册'
    }
]
export default class Sign extends React.Component {

    constructor(props) {
        super(props);
        if (cache.local.getItem("access-token")) {
            Control.go('/home')
        }
        this.state = {
            currentNav: 'signIn'
        }
    }
    switchTab(currentNav) {
        this.setState({
            currentNav
        })
    }
    render() {

        const { currentNav } = this.state;
        return (
            <div className="sign">
                <div className="main-body">
                    <div className="header">
                        <h1 className="logo"></h1>
                        <h2 className="sub-title">为您更好的收集信息</h2>
                    </div>
                    <div className="tab-navs">
                        <div className="navs-slider" data-active={currentNav}>
                            {navs.map((nav) => {
                                return (
                                    <a
                                        key={nav.key}
                                        className={"navs-item " + (nav.key == currentNav ? 'active' : '')}
                                        onClick={this.switchTab.bind(this, nav.key)}
                                    >
                                        {nav.name}
                                    </a>
                                )
                            })}
                            <span className="navs-slider-bar"></span>
                        </div>
                    </div>
                    <div className="main">
                        {currentNav == "signIn" ? (
                            <SignIn />
                        ) : (
                                <SignUp />
                            )}
                    </div>
                </div>
            </div>
        )
    }
}