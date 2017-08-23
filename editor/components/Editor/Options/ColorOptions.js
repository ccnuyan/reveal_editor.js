import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { SketchPicker } from 'react-color';

import actions from '../../../store/actions';

class ColorOptions extends Component {

  static propTypes = {
    label: PropTypes.string,
    isMain: PropTypes.bool,
    blockProp: PropTypes.string.isRequired,
    selectedBlocks: PropTypes.array.isRequired,
    set_current_block: PropTypes.func.isRequired,
  }

  cdm = () => {
    this.colorpicker.spectrum({
      color: '#f00',
    });
  }

  handleChange = (color) => {
    const selectedBlock = this.props.selectedBlocks[0];
    selectedBlock[this.props.blockProp] = color.hex;
    const params = {};
    params[this.props.blockProp] = color.hex;
    window.RevealEditor.currentSection.getSelectedBlocks()[0].setState(params);
    this.props.set_current_block(selectedBlock);
  }

  render = () => {
    const selectedBlock = this.props.selectedBlocks[0];

    return (
      <div className="block-option">
        {this.props.isMain ?
          <div className="ui horizontal inverted divider header" style={ { fontSize: '120%' } }>{this.props.label ? this.props.label : 'Color'}</div> :
          <div>{this.props.label ? this.props.label : 'Color'}</div>}
        <SketchPicker
        color={ selectedBlock[this.props.blockProp] }
        onChange={ this.handleChange }
        />
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
    set_current_block: actions.set_current_block(dispacher),
  };
};

export default connect(mapStateToProps, mapActionsToProps)(ColorOptions);
