import React, { Component } from 'react';
import { connect } from 'react-redux';

import actions from '../../../store/actions';

class Manipulations extends Component {

  undo = (event) => {
    event.preventDefault();
    window.RevealEditor.services.undoredo.undo();
  }

  redo = (event) => {
    event.preventDefault();
    window.RevealEditor.services.undoredo.redo();
  }

  render = () => {
    return (
      <div id='editor_manipulations' className="ui center aligned segment">
        <div className="ui list">
          <div className="item">
            <button onTouchTap={ this.props.set_preview } className="ui icon button">
              <i className="play icon"></i>
            </button>
          </div>
          <div className="item">
            <button onTouchTap={ this.undo } className="ui icon button">
              <i className="undo icon"></i>
            </button>
          </div>
          <div className="item">
            <button onTouchTap={ this.redo } className="ui icon button">
              <i className="redo icon"></i>
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
