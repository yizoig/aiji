
import React from 'react'
export default class Icon extends React.Component {

  render() {

    let { type, className = '', size = 'md', ...restProps } = this.props;

    let svg = void 0;
    try {
      svg = require('../../../sources/svg/' + type + '.svg');
    } catch (e) { }
    return (
      <svg
        className={`am-icon am-icon-${type} am-icon-${size} ${className}`}
        {...restProps}
      >
        <use xlinkHref={"#" + type} />
      </svg>
    )
  }
}