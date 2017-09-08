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
    <title>reveal-editor.js</title>
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

  arrange = () => {
    window.RevealEditor.toArrange();
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
    newHTML = newHTML.replace('__REVEAL__', window.RevealEditor.services.snapshot.getSnapshot());

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
      <div className="editor_manipulations">
        <button onTouchTap={ this.preview } className="editor-button">
          <i className="icon-controller-play"></i>
        </button>
        <button onTouchTap={ this.undo } className="editor-button">
          <i className="icon-level-up"></i>
        </button>
        <button onTouchTap={ this.redo } className="editor-button">
          <i className="icon-level-down"></i>
        </button>
        <button onTouchTap={ this.arrange } className="editor-button">
          <i className="icon-grid"></i>
        </button>
        {/* <button className="editor-button">
          <i className="icon-save"></i>
        </button> */}
        <button onTouchTap={ this.export } className="editor-button">
          <i className="icon-download"></i>
        </button>
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
