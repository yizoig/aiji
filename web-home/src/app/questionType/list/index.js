import React from 'react'
import './index.less'
import { List, InputItem } from 'antd-mobile';
import { Link } from 'react-keeper';
import NavBarPage from '../../common/NavBarPage';
import { Icon } from '../../common';
let data = [
    // {
    //     id: 1,
    //     name: '单选题',
    //     type: 'radio',
    //     icon: <Icon type="dan-circle-o" />
    // },
    // {
    //     id: 2,
    //     name: '多选题',
    //     type: 'check',
    //     icon: <Icon type="duo-circle-o" />
    // },
    {
        id: 3,
        name: '填空题',
        type: 'input',
        icon: <Icon type="input" />
    },

]
export default class QuestTypeList extends React.Component {

    render() {
        console.log(this.props);
        return (
            <div className="questions" onClick={this.props.onClose}>
                <div className="type-box">
                    <div className="header">选择题目类型</div>
                    <div className="quest-type-list">
                        {data.map((item) => (
                            <Link
                            to={`/tabular/${this.props.tid}/field/create`}
                            className="type-item" 
                            key={item.id}
                            >
                                {item.icon}
                                <div>{item.name}</div>
                            </Link>
                        ))}
                    </div>
                    <div className="close" onClick={() => {
                        this.props.onClose();
                    }}>
                        <Icon type="close-o" />
                    </div>
                </div>
            </div>
        )
    }
}