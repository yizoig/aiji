import React from 'react'
import { render } from 'react-dom'
import StartPage from './StartPage'
import TabularEditor from './Tabular/editor'
import TabularFieldEditor from './TabularField/editor'
import TabularFieldList from './TabularField/list'
import TabularPublish from './Tabular/publish'
import TabularData from './Tabular/data'
import UpdatePassword from './Mine/updatePassword';
import Sign from './Sign'
import Home from './Home'
import ResultPage from './Result'
import './index.less'
import {
    HashRouter,
    Route
} from 'react-keeper';
import PrivateRoute from './common/PrivateRoute';
export default class App extends React.Component {
    render() {
        return (
            <HashRouter >
                <div className="page-wrapper">
                    <PrivateRoute path="/home" component={Home} />
                    <PrivateRoute path="/updatePassword" component={UpdatePassword} />
                    <PrivateRoute path="/tabular/:tid/field/list" component={TabularFieldList} />
                    <PrivateRoute path="/tabular/:tid/editor" component={TabularEditor} />
                    <PrivateRoute path="/tabular/:tid/data" component={TabularData} />
                    <PrivateRoute path="/tabular/create" component={TabularEditor} />
                    <Route path="/tabular/:id/publish" component={TabularPublish} />
                    <PrivateRoute path="/tabular/:tid/field/create" component={TabularFieldEditor} />
                    <PrivateRoute path="/tabular/:tid/field/editor/:fid" component={TabularFieldEditor} />
                    <Route path="/signIn" component={Sign} />
                    <Route path="/result/success" component={ResultPage} />
                    <Route index component={StartPage} />
                </div>
            </HashRouter>
        )
    }
}   