import React, { Component } from 'react';
import classnames from 'classnames';


export class Skeleton extends Component {
  render() {
    return (
      <div className="cf h-100 w-100 absolute flex">
        <div className="h-100" style={{ flexGrow: 1 }}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

