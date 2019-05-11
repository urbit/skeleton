import React, { Component } from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import classnames from 'classnames';

import { api } from '/api';
import { store } from '/store';
import { Skeleton } from '/components/skeleton';


export class Root extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    store.setStateHandler(this.setState.bind(this));
  }

  render() {
    return (
      <BrowserRouter>
        <div>
        <Route exact path="/~skeleton"
          render={ (props) => {
            return (
              <Skeleton>
                <div className="w-100 h-100 fr" style={{ flexGrow: 1 }}>
                  <p>example skeleton</p>
                </div>
              </Skeleton>
            );
          }} />
        </div>
      </BrowserRouter>
    )
  }
}

