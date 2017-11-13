import React from 'react';
import cache from '../../../sources/lib/cache';
import { Route, Control } from 'react-keeper'
const loginFilter = (callback, props) => {

    new Promise((resolve, reject) => {
        if (!cache.local.getItem("access-token")) {
            Control.go('/signIn')
            reject();
        } else {
            resolve();
        }
    }).then(callback);
}
const PrivateRoute = ({ component: Component, ...rest }) => {
    return <Route {...rest} component={Component} enterFilter={loginFilter} />
}
export default PrivateRoute;