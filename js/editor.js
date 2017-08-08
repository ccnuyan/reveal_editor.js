import React from 'react';
import ReactDom from 'react-dom';

import Main from './components/Main';

import '../css/editor.scss';


document.getElementsByClassName('reveal')[0]
    .insertAdjacentHTML('afterend', '<div id="reveal_editor"></div>');

ReactDom.render((<Main></Main>), document.getElementById('reveal_editor'));
