import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import actions from '../../../store/actions';

/* eslint-disable no-param-reassign, radix */

class RemoveOptions extends Component {
  static propTypes = {
    isMain: PropTypes.bool,
    label: PropTypes.string,
    editor: PropTypes.object.isRequired,
    selectedBlocks: PropTypes.array.isRequired,
    set_editor: PropTypes.func.isRequired,
    set_selected_blocks: PropTypes.func.isRequired,
  }

  onPaste = () => {
    window.RevealEditor.currentSection.paste(this.props.editor.clipboard);
  }

  render = () => {
    return (
      <div className="remove-option">
        <button className="editor-button" onTouchTap={ this.onPaste } data-change-direction='+'>
          <div className="icon-paste"></div>
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    editor: state.editor.toJSON(),
    selectedBlocks: state.editor.toJSON().currentSection.selectedBlocks,
  };
};

const mapActionsToProps = (dispacher) => {
  return {
    set_selected_blocks: actions.set_selected_blocks(dispacher),
    set_editor: actions.set_editor(dispacher),
  };
};

export default connect(mapStateToProps, mapActionsToProps)(RemoveOptions);
