import React from 'react';
import ReactDOM from 'react-dom';
import { Root } from '/components/root';
import { subscription } from "/subscription";

subscription.setAuthTokens({
  ship: window.ship
});

ReactDOM.render((
  <Root />
), document.querySelectorAll("#root")[0]);
