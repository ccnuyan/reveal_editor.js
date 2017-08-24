import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import actions from '../../../store/actions';

/* eslint-disable no-param-reassign, radix */

class ZIndexOptions extends Component {
  static propTypes = {
    isMain: PropTypes.bool,
    label: PropTypes.string,
    blockProp: PropTypes.string,
    selectedBlocks: PropTypes.array.isRequired,
    set_selected_blocks: PropTypes.func.isRequired,
  }

  changeZIndex = (event) => {
    const dir = event.currentTarget.dataset.changeDirection;
    let index = 0;
    this.props.selectedBlocks.forEach((block) => {
      let zIndex = block.zIndex;
      switch (dir) {
        case '+': {
          zIndex = Math.min(zIndex + 1, 255);
          break;
        }
        case '-': {
          zIndex = 0;
          break;
        }
        default: {
          break;
        }
      }
      const params = {
        zIndex,
      };
      block.fontSize = zIndex;
      window.RevealEditor.currentSection.getSelectedBlocks()[index].setState(params);
      index += 1;
    });
    this.props.set_selected_blocks(this.props.selectedBlocks);
  }

  render = () => {
    return (
      <div className="block-option">
        {this.props.isMain ?
          <div className="ui horizontal inverted divider">{this.props.label ? this.props.label : 'Depth'}</div> :
          <div>{this.props.label ? this.props.label : 'Depth'}</div>}
        <div className="ui buttons">
          <button className="ui icon button" onTouchTap={ this.changeZIndex } data-change-direction='-'>
            <i className="down chevron icon"></i>
          </button>
          <button className="ui icon button" onTouchTap={ this.changeZIndex } data-change-direction='+'>
            <i className="up chevron icon"></i>
          </button>
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
    set_selected_blocks: actions.set_selected_blocks(dispacher),
  };
};

export default connect(mapStateToProps, mapActionsToProps)(ZIndexOptions);
