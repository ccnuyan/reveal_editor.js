import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import actions from '../../../store/actions';

/* eslint-disable radix */

class Percentage {
  constructor(str) {
    this.perString = str.trim();
    this.number = parseInt(this.perString);
    this.perNumber = this.number / 100.0;
  }
}

class FontSizeOptions extends Component {
  static propTypes = {
    isMain: PropTypes.bool,
    label: PropTypes.string,
    blockProp: PropTypes.string,
    selectedBlocks: PropTypes.array.isRequired,
    set_current_block: PropTypes.func.isRequired,
  }

  changeFontSize = (event) => {
    const selectedBlock = this.props.selectedBlocks[0];
    const dir = event.currentTarget.dataset.changeDirection;
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

    selectedBlock.fontSize = newPer;
    const params = {};
    params.fontSize = newPer;
    window.RevealEditor.currentSection.getSelectedBlocks()[0].setState(params);
    this.props.set_current_block(selectedBlock);
  }

  render = () => {
    const selectedBlock = this.props.selectedBlocks[0];

    return (
      <div className="block-option">
        {this.props.isMain ?
          <div className="ui horizontal inverted divider">{this.props.label ? this.props.label : 'Font Size'}</div> :
          <div>{this.props.label ? this.props.label : 'Color'}</div>}
        <div className="ui buttons">
          <button className="ui icon button" onTouchTap={ this.changeFontSize } data-change-direction='-'>
            <i className="minus icon"></i>
          </button>
          <button className="ui button">
            {selectedBlock.fontSize}
          </button>
          <button className="ui icon button" onTouchTap={ this.changeFontSize } data-change-direction='+'>
            <i className="plus icon"></i>
          </button>
          <button className="ui icon button" onTouchTap={ this.changeFontSize } data-change-direction='0'>
            <i className="remove icon"></i>
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
    set_current_block: actions.set_current_block(dispacher),
  };
};

export default connect(mapStateToProps, mapActionsToProps)(FontSizeOptions);
