import React from 'react'
import './index.less'
export default class Button extends React.Component {

    render() {
        return (
            <button
                className="yizo-btn"
                {...this.props}>
                {this.props.children}
            </button>
        )
    }
}
