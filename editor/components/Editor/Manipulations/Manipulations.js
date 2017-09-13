import React, { Component } from 'react';
import PropTypes from 'prop-types';
import fetch from 'isomorphic-fetch';

import create from '../../creator';

import './Manipulations.scss';

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
        __REVEAL__
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
  exportRequiredStylesheets = ['normalize', 'katex', 'reveal', 'theme', 'theme_override'];
  exportRequiredScripts = ['head', 'html5shiv', 'reveal'];

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
    this.props.editor_set_preview();
  }

  arrange = () => {
    window.RevealEditor.toArrange();
  }

  instantSave = () => {
    const ct = window.RevealEditor.services.snapshot.getContent();
    if (ct.content !== this.props.editor.instant_save_content) {
      this.props.editor_instant_save(ct);
    }
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
    newHTML = newHTML.replace('__REVEAL__', window.RevealEditor.services.snapshot.getContent().content);

    const uri = `data:text/html;charset=utf-8,${newHTML}`;

    const downloadLink = document.createElement('a');
    downloadLink.setAttribute('target', '_blank');
    downloadLink.style.display = 'none';
    downloadLink.href = uri;
    downloadLink.download = 'offline_player.html';

    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }

  render = () => {
    // const { instant_save_busy, instant_save_error } = this.props;
    const instant_save_busy = false;
    const instant_save_error = false;

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
        <button onTouchTap={ this.arrange } className={ 'editor-button' }>
          <i className="icon-grid"></i>
        </button>
        <button onTouchTap={ this.instantSave }
        className={ `editor-button${instant_save_busy ? ' busy' : ''}${instant_save_error ? ' error' : ''}` }
        >
          <i className="icon-save"></i>
        </button>
        <button onTouchTap={ this.export } className="editor-button">
          <i className="icon-download"></i>
        </button>

        <button onTouchTap = { () => window.location.replace('/') }
        className="editor-button"
        >
          <i className="icon-home"></i>
        </button>
      </div>
    );
  }
}

Manipulations.propTypes = {
  editor_set_preview: PropTypes.func.isRequired,
  editor_instant_save: PropTypes.func.isRequired,
  editor: PropTypes.object.isRequired,
  // instant_save_busy: PropTypes.bool.isRequired,
  // instant_save_error: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  return {
    editor: state.editor.toJSON(),
    instant_save_busy: state.asyncStatus.toJSON().EDITOR_INSTANT_SAVE_BUSY,
    instant_save_error: state.asyncStatus.toJSON().EDITOR_INSTANT_SAVE_ERROR,
  };
};

export default create(Manipulations, mapStateToProps);
