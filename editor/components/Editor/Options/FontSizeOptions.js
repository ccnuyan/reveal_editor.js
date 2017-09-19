import React, { Component } from 'react';
import PropTypes from 'prop-types';

import create from '../../creator';


/* eslint-disable radix */

class Percentage {
  constructor(str) {
    this.perString = str.trim();
    this.number = parseInt(this.perString);
    this.perNumber = this.number / 100.0;
  }
}

class FontSizeOptions extends Component {
  changeFontSize = (event) => {
    const selectedBlock = this.props.selectedBlocks[0];
    const dir = event.currentTarget.getAttribute('data-change-direction');
    const per = new Percentage(selectedBlock.fontSize);
    let newPer = '100%';
    switch (dir) {
      case '0': {
        break;
      }
      case '+': {
        newPer = `${Math.min(per.number + 10, 300)}%`;
        break;
      }
      case '-': {
        newPer = `${Math.max(per.number - 10, 10)}%`;
        break;
      }
      default: {
        break;
      }
    }

    const params = { fontSize: newPer };
    const newState = window.RevealEditor.currentSection.getSelectedBlocks()[0].setState(params);
    this.props.editor_set_current_block(newState);
  }

  render = () => {
    const selectedBlock = this.props.selectedBlocks[0];

    return (
      <div className="font-size-option">
        <button className="editor-button" onTouchTap={ this.changeFontSize } data-change-direction='-'>
          <div className="icon-minus"></div>
        </button>
        <div>
          {selectedBlock.fontSize}
        </div>
        <button className="editor-button" onTouchTap={ this.changeFontSize } data-change-direction='+'>
          <div className="icon-plus"></div>
        </button>
        <button className="editor-button" onTouchTap={ this.changeFontSize } data-change-direction='0'>
          <div className="icon-cw" ></div>
        </button>
      </div>
    );
  }
}

FontSizeOptions.propTypes = {
  isMain: PropTypes.bool,
  label: PropTypes.string,
  blockProp: PropTypes.string,
  selectedBlocks: PropTypes.array.isRequired,
  editor_set_current_block: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    selectedBlocks: state.editor.toJSON().currentSection.selectedBlocks,
  };
};

export default create(FontSizeOptions, mapStateToProps);
