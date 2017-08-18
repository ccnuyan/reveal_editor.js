import React, { Component } from 'react';
import { connect } from 'react-redux';

import actions from '../../../store/actions';

class Manipulations extends Component {
  render =() => {
    return (
      <div id='editor_manipulations' className="ui center aligned segment">
        <div className="ui list">
          <a href="" className="item">
            <button onTouchTap={ this.props.set_preview }
            className="ui icon button"
            >
              <i className="play icon"></i>
            </button>
          </a>
          <a href="" className="item">
            <button
        className="ui icon button"
            >
              <i className="undo icon"></i>
            </button>
          </a>
          <a href="" className="item">
            <button
        className="ui icon button"
            >
              <i className="save icon"></i>
            </button>
          </a>
          <a href="" className="item">
            <button
        className="ui icon button"
            >
              <i className="sidebar icon"></i>
            </button>
          </a>
          <a href="" className="item">
            <button
        className="ui icon button"
            >
              <i className="folder open icon"></i>
            </button>
          </a>
          <a href="" className="item">
            <button
        className="ui icon button"
            >
              <i className="external icon"></i>
            </button>
          </a>
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
