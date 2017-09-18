import React, { Component } from 'react';
import PropTypes from 'prop-types';

import create from '../../creator';

import './Manipulations.scss';

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
      this.props.editor_instant_save({
        content: ct.content,
        snapshot: window.RevealEditor.services.snapshot.getSnapshot(),
      });
    }
  }

  export = async () => {
    window.open(`/api/works/download?work_id=${window.sc_mode.work_id}`);
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
        {!window.sc_mode.anonymous ? <button onTouchTap={ this.instantSave }
        className={ `editor-button${instant_save_busy ? ' busy' : ''}${instant_save_error ? ' error' : ''}` }
                                     >
          <i className="icon-save"></i>
        </button> : ''}
        {!window.sc_mode.anonymous ?
          <button onTouchTap={ this.export } className="editor-button">
            <i className="icon-download"></i>
          </button> : ''}
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
