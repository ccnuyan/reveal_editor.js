import React, { Component } from 'react';
import PropTypes from 'prop-types';

import create from '../../creator';

/* eslint-disable no-param-reassign, radix */

class RemoveOptions extends Component {

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

RemoveOptions.propTypes = {
  isMain: PropTypes.bool,
  label: PropTypes.string,
  editor: PropTypes.object.isRequired,
  selectedBlocks: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
  return {
    editor: state.editor.toJSON(),
    selectedBlocks: state.editor.toJSON().currentSection.selectedBlocks,
  };
};

export default create(RemoveOptions, mapStateToProps);
