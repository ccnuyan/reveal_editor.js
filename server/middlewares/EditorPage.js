/* eslint-disable linebreak-style */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOMServer from 'react-dom/server';

import assets from '../../build/assets.json';
import config from '../../config';

class EditorPage extends Component {
  static propTypes = {
    app: PropTypes.string.isRequired,
  }
  render = () => {
    return (
      <html className="no-js" lang="zh-CN">
        <head>
          <meta charSet="utf-8"/>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>

          <title>reveal_editor.js</title>
          {
            Object.keys(config.stylesheets).map(key => <link id={ `css_${key}` } rel="stylesheet" key={ key } href={ config.stylesheets[key] }/>)
          }
          <link id={ 'css_core' } rel="stylesheet" href={ assets.core.css }/>
          <link id={ 'css_editor' } rel="stylesheet" href={ assets.editor.css }/>
          <link id={ 'css_theme' } rel="stylesheet"/>
          <link id={ 'css_theme_override' } rel="stylesheet"/>
        </head>
        <body>
          <div id="wrapper">
            <div id="reveal_container">
              <div className="reveal">
              </div>
            </div>
            <div id="reveal_editor"></div>
          </div>
          {
            Object.keys(config.scripts).map(key => <script id={ `js_${key}` } key={ key } src={ config.scripts[key] }/>)
          }
          <script id={ 'js_core' } src={ assets.core.js }/>
          <script id={ 'js_editor' } src={ assets.editor.js }/>
        </body>
      </html>
    );
  }
}

const renderer = (req, res) => {
  const app = assets[req.params.app] ? req.params.app : 'app';
  const content = `<!doctype html>${ReactDOMServer.renderToStaticMarkup(<EditorPage app={ app }/>)}`;
  res.type('.html');
  res.send(content);
};

export default renderer;
