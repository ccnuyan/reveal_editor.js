import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';

// import 'whatwg-fetch';
import injectTapEventPlugin from 'react-tap-event-plugin';
import es6Promise from 'es6-promise';

import store from './store';
import Main from './components/Main';
import './global.scss';
import './editor.scss';

injectTapEventPlugin();
es6Promise.polyfill();

ReactDom.render((
  <Provider store={ store }>
    <Main/>
  </Provider>),
document.querySelector('.reveal-editor'));
