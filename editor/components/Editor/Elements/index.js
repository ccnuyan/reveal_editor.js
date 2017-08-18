import React, { Component } from 'react';
import { connect } from 'react-redux';

import actions from '../../../store/actions';

class Elements extends Component {
  render = () => {
    return (
      <div id='editor_elements' className="ui center aligned segment">
        <div className="ui list">
          <div className="item">
            <div className="ui inverted massive icon button" onTouchTap={ this.onAddNewText }>
              <i className="font icon"></i>
            </div>
          </div>
          <div className="item">
            <div className="ui inverted massive icon button">
              <i className="image icon"></i>
            </div>
          </div>
        </div>
      </div>
    );
  }

  onAddNewText = () => {
    window.RevealEditor.currentSection.addText();
  }
}

const mapStateToProps = (state) => {
  return {
    editor: state.editor.toJSON(),
  };
};

const mapActionsToProps = (dispacher) => {
  return {
    add_new_text: actions.set_preview(dispacher),
  };
};

export default connect(mapStateToProps, mapActionsToProps)(Elements);
