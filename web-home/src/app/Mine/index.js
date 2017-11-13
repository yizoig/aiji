import React from 'react'
import { List ,Toast} from 'antd-mobile'
import { Control,Link} from 'react-keeper'
import './index.less';
import cache from '../../sources/lib/cache';
import UserApi from '../../sources/lib/services/user';
export default class Mine extends React.Component {


    constructor(props) {
        super(props);
        let id = UserApi.getId();
        console.log(id)
        this.state = {
            id
        }
    }
    async componentWillMount(){
        await this.loadInfo();
    }
    async loadInfo(){
        try{
            let info =  await UserApi.info({id:this.state.id});
            cache.local.setItem("userInfo",JSON.stringify(info))
            this.setState({
                info
            })
        }catch(e){
            Toast.fail(e.message);
        }
    }
    render() {
        const {info={} } = this.state;
        return (
            <div className="mine">
                <div className="info">
                    <div>{info['account']}(欢迎你)</div>
                </div>
                <List >
                    <List.Item arrow="horizontal" onClick={()=>{
                        Control.go("/updatePassword")
                    }}>
                      修改密码
                    </List.Item>
                    <List.Item arrow="horizontal" onClick={()=>{
                        cache.local.removeItem("access-token");
                        Control.go("/signIn");
                    }}>
                        退出
                    </List.Item>
                </List>
            </div>
        )
    }
}