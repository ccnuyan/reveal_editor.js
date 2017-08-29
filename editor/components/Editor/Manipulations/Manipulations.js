import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import fetch from 'isomorphic-fetch';

import actions from '../../../store/actions';

const rawHTML =
`<!doctype html>
<html>
  <head>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>reveal_editor.js</title>
    <style>
      __STYLESHEET__
    </style>
  </head>
  <body>
    <div class="reveal">
      <div class="slides">
        __REVEAL__
      </div>
    </div>
    <script type="text/javascript">
      __SCRIPTS__
    </script>
    <script type="text/javascript">
      window.Reveal.initialize();
    </script>
  </body>
</html>`;

class Manipulations extends Component {
  exportRequiredStylesheets = ['reveal', 'katex', 'theme', 'theme_override'];
  exportRequiredScripts = ['head', 'html5shiv', 'classList', 'reveal'];
  static propTypes = {
    set_preview: PropTypes.func.isRequired,
  }

  undo = (event) => {
    event.preventDefault();
    window.RevealEditor.services.undoredo.undo();
  }

  redo = (event) => {
    event.preventDefault();
    window.RevealEditor.services.undoredo.redo();
  }

  preview = () => {
    window.RevealEditor.toPreview();
    this.props.set_preview();
  }

  export = async () => {
    const stylesheets = this.exportRequiredStylesheets.map((ss) => {
      return document.querySelector(`link#css_${ss}`).getAttribute('href');
    });
    const scripts = this.exportRequiredScripts.map((sc) => {
      return document.querySelector(`script#js_${sc}`).getAttribute('src');
    });

    const cssContents = await Promise.all(stylesheets.map((ss) => {
      return fetch(ss)
      .then((response) => {
        if (response.status >= 400) {
          throw new Error('Bad response from server');
        }
        return response.text();
      });
    }));

    const jsContents = await Promise.all(scripts.map((sc) => {
      return fetch(sc)
      .then((response) => {
        if (response.status >= 400) {
          throw new Error('Bad response from server');
        }
        return response.text();
      });
    }));

    let newHTML = rawHTML.replace('__STYLESHEET__', cssContents.join('\n'));
    newHTML = newHTML.replace('__SCRIPTS__', jsContents.join('\n'));
    newHTML = newHTML.replace('__REVEAL__', window.RevealEditor.services.snapshot(window.RevealEditor));

    const uri = `data:text/html;charset=utf-8,${newHTML}`;

    const downloadLink = document.createElement('a');
    downloadLink.style.display = 'none';
    downloadLink.href = uri;
    downloadLink.download = 'slides.html';

    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }

  render = () => {
    return (
      <div id='editor_manipulations' className="ui center aligned segment">
        <div className="ui list">
          <div className="item">
            <button onTouchTap={ this.preview } className="ui icon button">
              <i className="play icon"></i>
            </button>
          </div>
          <div className="item">
            <button onTouchTap={ this.undo } className="ui icon button">
              <i className="reply icon"></i>
            </button>
          </div>
          <div className="item">
            <button onTouchTap={ this.redo } className="ui icon button">
              <i className="share icon"></i>
            </button>
          </div>
          <div onTouchTap={ this.export } className="item">
            <button className="ui icon button">
              <i className="save icon"></i>
            </button>
          </div>
          <div className="item">
            <button className="ui icon button">
              <i className="sidebar icon"></i>
            </button>
          </div>
          <div className="item">
            <button className="ui icon button">
              <i className="folder open icon"></i>
            </button>
          </div>
          <div className="item">
            <button className="ui icon button">
              <i className="external icon"></i>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    editor: state.editor.toJSON(),
  };
};

const mapActionsToProps = (dispacher) => {
  return {
    set_preview: actions.set_preview(dispacher),
  };
};

export default connect(mapStateToProps, mapActionsToProps)(Manipulations);
