import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import actions from '../../../store/actions';

/* eslint-disable radix */

class WidthOptions extends Component {
  static propTypes = {
    label: PropTypes.string,
    suffix: PropTypes.string.isRequired,
    isMain: PropTypes.bool,
    blockProp: PropTypes.string.isRequired,
    selectedBlocks: PropTypes.array.isRequired,
    set_current_block: PropTypes.func.isRequired,
  }

  applyWidth = (rawWidth) => {
    const width = Math.min(Math.max(rawWidth, 1), 50);
    const selectedBlock = this.props.selectedBlocks[0];
    selectedBlock[this.props.blockProp] = `${width}${this.props.suffix}`;
    const params = {};
    params[this.props.blockProp] = `${width}${this.props.suffix}`;
    window.RevealEditor.currentSection.getSelectedBlocks()[0].setState(params);
    this.props.set_current_block(selectedBlock);
  }

  onWidthChange = (event) => {
    const rawWidth = parseInt(event.currentTarget.value);
    const width = isNaN(rawWidth) ? 1 : rawWidth;
    this.applyWidth(width);
  }

  onWheel = (event) => {
    const orgWidth = this.props.selectedBlocks[0][this.props.blockProp];
    const width = event.deltaY > 0 ? -1 : 1;
    this.applyWidth(parseInt(orgWidth) + width);
  }


  render = () => {
    const selectedBlock = this.props.selectedBlocks[0];

    return (
      <div className="block-option" style={ { textAlign: 'left' } }>
        {this.props.isMain ?
          <div className="ui horizontal inverted divider header" style={ { fontSize: '120%' } }>{this.props.label ? this.props.label : 'Width'}</div> :
          <div>{this.props.label ? this.props.label : 'Width'}</div>}
        <div className="ui right labeled input" style={ { width: '175px' } }>
          <input onWheel={ this.onWheel }
            onChange={ this.onWidthChange }
            value={ parseInt(selectedBlock[this.props.blockProp]) } type="text" placeholder="number"
          />
          <div className="ui basic label">
            px
          </div>
        </div>
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

export default connect(mapStateToProps, mapActionsToProps)(WidthOptions);
