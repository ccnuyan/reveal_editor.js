import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';

import 'whatwg-fetch';
import injectTapEventPlugin from 'react-tap-event-plugin';

import store from './store';
import Main from './components/Main';
import './editor.scss';

injectTapEventPlugin();

ReactDom.render((
  <Provider store={ store }>
    <Main/>
  </Provider>),
document.getElementById('reveal_editor'));
