import React, { Component } from 'react';
import { connect } from 'react-redux';

import actions from '../../store/actions';

class Editor extends Component {
  render = () => {
    return (
      <div className="ui segment">
        111
        <div className="ui left rail">
          <div className="ui segment">
            1234
            {/* <button onTouchTap={ this.props.set_preview }
            className="ui icon button"
            >
              <i className="play icon"></i>
            </button> */}
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

export default connect(mapStateToProps, mapActionsToProps)(Editor);
