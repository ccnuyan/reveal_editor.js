import React, { Component } from 'react';
import PropTypes from 'prop-types';

import create from '../../creator';

/* eslint-disable radix */

class WidthOptions extends Component {

  applyWidth = (rawWidth) => {
    const width = Math.min(Math.max(rawWidth, 1), 50);
    const params = {};
    params[this.props.blockProp] = `${width}${this.props.suffix}`;
    const newState = window.RevealEditor.currentSection.getSelectedBlocks()[0].setState(params);
    this.props.editor_set_current_block(newState);
  }

  onWidthChange = (event) => {
    const rawWidth = parseInt(event.currentTarget.value);
    const width = isNaN(rawWidth) ? 1 : rawWidth;
    this.applyWidth(width);
  }

  onWheel = (event) => {
    event.preventDefault();
    const orgWidth = this.props.selectedBlocks[0][this.props.blockProp];
    const width = event.deltaY > 0 ? -1 : 1;

    this.applyWidth(parseInt(orgWidth) + width);
  }

  render = () => {
    const selectedBlock = this.props.selectedBlocks[0];

    return (
      <div className="width-option" >
        <input onWheel={ this.onWheel }
            onChange={ this.onWidthChange }
            value={ parseInt(selectedBlock[this.props.blockProp]) } type="text" placeholder="number"
        />
        <div className="ui basic label">
            PX
        </div>
      </div>
    );
  }
}

WidthOptions.propTypes = {
  label: PropTypes.string,
  suffix: PropTypes.string.isRequired,
  isMain: PropTypes.bool,
  blockProp: PropTypes.string.isRequired,
  selectedBlocks: PropTypes.array.isRequired,
  editor_set_current_block: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    selectedBlocks: state.editor.toJSON().currentSection.selectedBlocks,
  };
};

export default create(WidthOptions, mapStateToProps);
