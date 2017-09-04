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

  onRemove = () => {
    window.RevealEditor.currentSection.removeSelectedBlocks();
    this.props.set_selected_blocks(window.RevealEditor.currentSection.getSelectedBlockStates());
  }

  onCopy = () => {
    const html = window.RevealEditor.currentSection.copySelectedBlocks();
    const newEditor = {
      ...this.props.editor,
      clipboard: html,
    };
    this.props.set_editor(newEditor);
  }

  render = () => {
    return (
      <div className="remove-option">
        <button className="editor-button" onTouchTap={ this.onCopy } data-change-direction='+'>
          <div className="icon-copy"></div>
        </button>
        <button className="editor-button" onTouchTap={ this.onRemove } data-change-direction='+'>
          <div className="icon-trash-o"></div>
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
