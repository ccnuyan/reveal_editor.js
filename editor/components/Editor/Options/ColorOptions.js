import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import reactCSS from 'reactcss';
import { SwatchesPicker, SketchPicker } from 'react-color';

import actions from '../../../store/actions';

const pickerMap = {
  SwatchesPicker,
  SketchPicker,
};

class ColorOptions extends Component {

  static propTypes = {
    label: PropTypes.string,
    isMain: PropTypes.bool,
    blockProp: PropTypes.string.isRequired,
    selectedBlocks: PropTypes.array.isRequired,
    set_current_block: PropTypes.func.isRequired,
  }

  state = {
    displayColorPicker: false,
    picker: 'SwatchesPicker',
  };

  handleClick = (event) => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker, picker: event.currentTarget.dataset.picker });
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false });
  };

  handleChange = (color) => {
    const rgba = `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a ? color.rgb.a : 1})`;
    const selectedBlock = this.props.selectedBlocks[0];
    selectedBlock[this.props.blockProp] = rgba;
    const params = {};
    params[this.props.blockProp] = rgba;
    window.RevealEditor.currentSection.getSelectedBlocks()[0].setState(params);
    this.props.set_current_block(selectedBlock);
  };

  styles = reactCSS({
    default: {
      color: {
        width: 'auto',
        height: '18px',
        borderRadius: '2px',
      },
      swatch: {
        display: 'inline-block',
        width: '40%',
        margin: '5%',
        padding: '5px',
        background: '#fff',
        borderRadius: '1px',
        boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
        cursor: 'pointer',
      },
      popover: {
        position: 'absolute',
        zIndex: '2',
      },
      cover: {
        position: 'fixed',
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px',
      },
    },
  });

  createPicker = () => {
    const selectedBlock = this.props.selectedBlocks[0];
    return React.createElement(pickerMap[this.state.picker], {
      width: 200,
      color: selectedBlock[this.props.blockProp],
      onChange: this.handleChange,
    });
  }

  render = () => {
    const selectedBlock = this.props.selectedBlocks[0];
    return (
      <div className="block-option">
        {this.props.isMain ?
          <div className="ui horizontal inverted divider">{this.props.label ? this.props.label : 'Color'}</div> :
          <div>{this.props.label ? this.props.label : 'Color'}</div>}
        <div>
          {/* <div style={ this.styles.swatch } onTouchTap={ this.handleClick } data-picker="SwatchesPicker">
            <div style={ { ...this.styles.color, background: selectedBlock[this.props.blockProp] } } />
          </div> */}
          <div style={ this.styles.swatch } onTouchTap={ this.handleClick } data-picker="SketchPicker">
            <div style={ { ...this.styles.color, background: selectedBlock[this.props.blockProp] } } />
          </div>
          { this.state.displayColorPicker ?
            <div style={ this.styles.popover }>
              <div style={ this.styles.cover } onTouchTap={ this.handleClose }/>
              {this.createPicker()}
            </div> : null }
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

export default connect(mapStateToProps, mapActionsToProps)(ColorOptions);
