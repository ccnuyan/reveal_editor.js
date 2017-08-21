import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import actions from '../../../store/actions';

class Manipulations extends Component {

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
          <div className="item">
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
