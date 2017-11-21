  import React from 'react'
  import { List, Toast, Button } from 'antd-mobile'
  import { Control, Link } from 'react-keeper'
  import './index.less';
  import cache from '../../sources/lib/cache';
  import AccountApi from '../../sources/lib/services/account';
  export default class Mine extends React.Component {
    constructor(props) {
      super(props);
      let id = AccountApi.getId();
      console.log(id)
      this.state = {
        id
      }
    }
    async componentWillMount() {
      await this.loadInfo();
    }
    async loadInfo() {
      try {
        let info = await AccountApi.info({ id: this.state.id });
        cache.local.setItem("userInfo", JSON.stringify(info))
        this.setState({
          info
        })
      } catch (e) {
        Toast.fail(e.message);
      }
    }
    render() {
      const { info = {} } = this.state;
      return (
        <div className="mine" style={{ padding: "30px 15px 10px 15px" }}>
          <div className="info-box">
            <div className="avatar">
              <img src="https://avatars0.githubusercontent.com/u/25115931?s=460&v=4" />
            </div>
            <div className="info">
              <div className="info-item">{info['name']}</div>
              <div className="info-item">{info['deptName']}</div>
              <div className="info-item">{info['type']}</div>
            </div>
          </div>
          <List >
            <List.Item arrow="horizontal" onClick={() => {
              Control.go("/updatePassword")
            }}>
              修改密码
                      </List.Item>
            <List.Item arrow="horizontal" onClick={() => {
              Control.go("/updatePassword")
            }}>
              关于爱集
                      </List.Item>
          </List>
          <div style={{ margin: "20px 0" }}>
            <Button
              size="small"
              onClick={() => {
                cache.local.removeItem("access-token");
                Control.go("/signIn");
              }}>退出</Button>
          </div>
        </div>
      )
    }
  }