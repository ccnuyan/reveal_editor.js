import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import actions from '../../../store/actions';

/* eslint-disable no-param-reassign, radix */

class RemoveOptions extends Component {
  static propTypes = {
    isMain: PropTypes.bool,
    label: PropTypes.string,
    selectedBlocks: PropTypes.array.isRequired,
    set_selected_blocks: PropTypes.func.isRequired,
  }

  onRemove = () => {
    const blocksToBeRemoved = window.RevealEditor.currentSection.getSelectedBlocks();
    blocksToBeRemoved.forEach((block) => {
      block.remove();
    });
    this.props.set_selected_blocks([]);
  }

  render = () => {
    return (
      <div className="remove-option">
        <button className="editor-button" onTouchTap={ this.onRemove } data-change-direction='+'>
          <div className="icon-trash"></div>
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    selectedBlocks: state.editor.toJSON().currentSection.selectedBlocks,
  };
};

const mapActionsToProps = (dispacher) => {
  return {
    set_selected_blocks: actions.set_selected_blocks(dispacher),
  };
};

export default connect(mapStateToProps, mapActionsToProps)(RemoveOptions);
