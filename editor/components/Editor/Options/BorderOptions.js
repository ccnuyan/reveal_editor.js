import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import actions from '../../../store/actions';
import WidthOptions from './WidthOptions';
import ColorOptions from './ColorOptions';

class BorderOptions extends Component {

  static propTypes = {
    label: PropTypes.string,
    selectedBlocks: PropTypes.array.isRequired,
    set_current_block: PropTypes.func.isRequired,
  }

  onChange = (event) => {
    if (event.currentTarget.checked) {
      const selectedBlock = this.props.selectedBlocks[0];
      selectedBlock.borderStyle = 'solid';

      const params = {};
      params.borderStyle = 'solid';

      if (selectedBlock.borderWidth.startsWith('0')) {
        params.borderWidth = '1px';
        selectedBlock.borderWidth = '1px';
      }

      window.RevealEditor.currentSection.getSelectedBlocks()[0].setState(params);
      this.props.set_current_block(selectedBlock);
    } else {
      const selectedBlock = this.props.selectedBlocks[0];
      selectedBlock.borderStyle = 'none';

      const params = {};
      params.borderStyle = 'none';

      window.RevealEditor.currentSection.getSelectedBlocks()[0].setState(params);
      this.props.set_current_block(selectedBlock);
    }
  }

  render = () => {
    const selectedBlock = this.props.selectedBlocks[0];

    return (
      <div className="ui container block-option">
        <div className="ui horizontal inverted divider">{this.props.label ? this.props.label : 'Border'}</div>
        <div style={ { display: 'block', width: 'auto', textAlign: 'left' } } className="ui checkbox">
          <input checked={ selectedBlock.borderStyle !== 'none' } onChange={ this.onChange } type="checkbox" name="example"/>
          <label htmlFor="example" style={ { color: 'white' } }>Enable</label>
        </div>
        {selectedBlock.borderStyle !== 'none' ? <WidthOptions isMain={ true } suffix={ 'px' } blockProp={ 'borderWidth' }/> : ''}
        {selectedBlock.borderStyle !== 'none' ? <ColorOptions isMain={ true } blockProp={ 'borderColor' }/> : ''}
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

export default connect(mapStateToProps, mapActionsToProps)(BorderOptions);
