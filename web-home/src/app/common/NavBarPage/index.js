import React from 'react'
import './index.less'
import { NavBar, List, InputItem } from 'antd-mobile';
import { Link,Control} from 'react-keeper';
export default class TabularEditor extends React.Component {

    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="navbar-page">
                <NavBar
                    onLeftClick={() => {
                        Control.go(-1);
                    }}
                    
                    {...this.props}
                    mode="dark"
                >{this.props.title}</NavBar>
                <div className="content">
                    {this.props.children}
                </div>
            </div>
        )
    }
}