/* eslint-disable linebreak-style */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOMServer from 'react-dom/server';

import assets from '../../build/assets.json';
import config from '../../config';
import preload_css from './preload.css';


class EditorPage extends Component {
  static propTypes = {
    app: PropTypes.string.isRequired,
  }
  render = () => {
    return (
      <html className="no-js" lang="zh-CN">
        <head>
          <meta charSet="utf-8"/>
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
          <title>reveal-editor.js</title>
          {
            Object.keys(config.stylesheets).map(key => <link id={ `css_${key}` } rel="stylesheet" key={ key } href={ config.stylesheets[key] }/>)
          }
          <link id={ 'css_core' } rel="stylesheet" href={ assets.core.css }/>
          <link id={ 'css_editor' } rel="stylesheet" href={ assets.editor.css }/>
          <style type="text/css">__STYLE__</style>
        </head>
        <body>
          <div className="wrapper">
            <div className="reveal-container">
              <div className="reveal">
              </div>
            </div>
            <div className="reveal-editor"></div>
          </div>

          <div className="spinner-container">
            <div className="spinner-header">
              <h1 className="spinner-header">
               Syncollege
              </h1>
              loading ...
            </div>

            <div className="spinner">
              <div className="rect1"></div>
              <div className="rect2"></div>
              <div className="rect3"></div>
              <div className="rect4"></div>
              <div className="rect5"></div>
            </div>

            <h3 className="spinner-footer">
              Chrome, Firefox, Safari and IE 10+
            </h3>
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

  const styledCotnent = content.replace('__STYLE__', preload_css);
  res.type('.html');
  res.send(styledCotnent);
};

export default renderer;
