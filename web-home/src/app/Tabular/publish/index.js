import React from 'react'
import './index.less'
import { ListView, InputItem, Toast, Modal, Button } from 'antd-mobile';
import TabularApi from '../../../sources/lib/services/tabular'
import { createForm } from 'rc-form';
import { Control,Link } from 'react-keeper';
import qr from 'qr-image';
import { TextDecoder } from 'text-encoding';
export default createForm()(
    class TabularPublish extends React.Component {

        constructor(props) {
            super(props);
            let code;
            let { share = false } = Control.state || {};
            if (share) {
                let u8 = qr.imageSync(window.location.href, {
                    margin: 1
                });
                code = "data:image/png;base64," + btoa(String.fromCharCode.apply(null, u8));
            }
            this.state = {
                maskShow: share,
                code
            }
        }
        async componentWillMount() {
            await this.loadData();
        }
        async loadData() {
            try {
                Toast.loading("获取数据中...");
                let data = await TabularApi.info({ id: this.props.params.id });
                if (!data) {
                    Toast.info("没有数据")
                    return;
                }
                this.setState({
                    data
                })
                Toast.hide();
            } catch (e) {
                console.log(e);
                Toast.fail("获取数据失败");
            }
        }
        async onSubmit() {
            this.props.form.validateFields(async (error, value) => {
                if (error) {
                    for (let key in error) {
                        Toast.info(this.props.form.getFieldError(key)[0])
                        return;
                    }
                }
                try {
                    Toast.loading("提交中...");

                    let params = this.props.form.getFieldsValue();
                    let { id } = this.state.data;
                    let result = await TabularApi.item({ tid: id, data: params })
                    if (!result) {
                        throw new Error("提交失败")
                    }
                    Toast.hide();
                    Control.go('/result/success', {
                        title: '提交成功',
                        mes: "表单已成功提交,谢谢您的参与"
                    })
                } catch (e) {
                    Toast.fail(e.message)
                }
            });
        }
        render() {
            const { data, maskShow, code } = this.state;
            const { getFieldProps, getFieldError } = this.props.form;
            return data ? (
                <div className="publish" >
                    <header className="nav-bar  ">
                        <div className="title">{data.title}</div>
                    </header>
                    <div className="content">
                        <div className="explanation">
                            {data.explanation}
                        </div>
                        <div className="items">
                            {data.fields.map((item, index) => {
                                return (
                                    <div className="item" key={index}>
                                        <div className="field-name">
                                            {item.field_name}
                                        </div>
                                        <div className="field-value">
                                            <input {...getFieldProps(item.id, {
                                                initialValue: item.default_value || "",
                                                rules: [{
                                                    required: item.required == '0',
                                                    message: item.field_name + "不能为空"
                                                }]
                                            }) } />
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <Button className="submit" type="primary" onClick={this.onSubmit.bind(this)}>提交</Button>
                    </div>
                    {maskShow && <div className="mask">
                        <div className="web-mask" onClick={() => {
                            this.setState({
                                maskShow: false
                            })
                        }}></div>
                        <div className="save-code">
                            <img src={code} />

                            <p>长按保存答题二维码</p>
                        </div>
                    </div>
                    }
                    <footer className="footer">
                        <Link to="/">关闭</Link>
                    </footer>
                </div>
            ) : (null)
        }
    }
)