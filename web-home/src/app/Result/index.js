import React from 'react'
import { Result, Icon} from 'antd-mobile';
import './index.less'
import {Link,  Control } from 'react-keeper';

export default class ResultPage extends React.Component{

    render(){
        const {title="操作成功",mes='操作成功'} = Control.state ||{};
        return (
           <div className="result">
                <Result
              img={<Icon type="check-circle" className="icon" style={{width:50,height:50, fill: '#1F90E6' }} />}
              title={title}
              message={mes}
            />
            <Link to="/" className="btn">首页</Link>
           </div>
        )
    }
}