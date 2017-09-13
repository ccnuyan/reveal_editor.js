import React, { Component } from 'react';
import PropTypes from 'prop-types';

import create from '../../creator';

/* eslint-disable no-param-reassign, radix */

class EditOptions extends Component {
  onRemove = () => {
    window.RevealEditor.currentSection.removeSelectedBlocks();
    this.props.editor_set_selected_blocks(window.RevealEditor.currentSection.getSelectedBlockStates());
  }

  onCopy = () => {
    const html = window.RevealEditor.currentSection.copySelectedBlocks();
    const newEditor = {
      ...this.props.editor,
      clipboard: html,
    };
    this.props.editor_set_editor(newEditor);
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

EditOptions.propTypes = {
  isMain: PropTypes.bool,
  label: PropTypes.string,
  editor: PropTypes.object.isRequired,
  selectedBlocks: PropTypes.array.isRequired,
  editor_set_editor: PropTypes.func.isRequired,
  editor_set_selected_blocks: PropTypes.func.isRequired,
};

export default create(EditOptions, mapStateToProps);
