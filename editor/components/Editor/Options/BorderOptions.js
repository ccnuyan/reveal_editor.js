import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import actions from '../../../store/actions';
import WidthOptions from './WidthOptions';
import ColorOptions from './ColorOptions';

import OptionContainer from './OptionContainer';

class BorderOptions extends Component {

  static propTypes = {
    label: PropTypes.string,
    selectedBlocks: PropTypes.array.isRequired,
    set_current_block: PropTypes.func.isRequired,
  }

  onChange = (event) => {
    let params;
    if (event.currentTarget.checked) {
      params = { borderStyle: 'solid', borderWidth: '1px', borderColor: 'black' };
    } else {
      params = { borderStyle: 'none' };
    }
    const newState = window.RevealEditor.currentSection.getSelectedBlocks()[0].setState(params);
    this.props.set_current_block(newState);
  }

  render = () => {
    const selectedBlock = this.props.selectedBlocks[0];
    return (
      <div>
        <div className="border-enable-checkbox">
          <input type="checkbox" checked={ selectedBlock.borderStyle !== 'none' } id="boder-enbale-cb" name="" onChange={ this.onChange } />
          <label htmlFor="boder-enbale-cb"></label>
        </div>
        <div className={ `border-additional-options${(selectedBlock.borderStyle === 'none') ? ' hidden' : ''}` }>
          <OptionContainer isMain={ false } label={ 'Border Width' }>
            <WidthOptions suffix={ 'px' } blockProp={ 'borderWidth' }/>
          </OptionContainer>
          <OptionContainer isMain={ false } label={ 'Border Color' }>
            <ColorOptions blockProp={ 'borderColor' }/>
          </OptionContainer>
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

export default connect(mapStateToProps, mapActionsToProps)(BorderOptions);
