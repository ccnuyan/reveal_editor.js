import React, { Component } from 'react';
import PropTypes from 'prop-types';
import reactCSS from 'reactcss';
import { BlockPicker } from 'react-color';
import create from '../../creator';

import './BackgroundColorPicker.scss';

class BackgroundColorPicker extends Component {
  state = {
    displayColorPicker: false,
  }

  handleOpen = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker });
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false });
  };

  handleChangeBackground = (color) => {
    const currentSection = this.props.currentSection;
    const hex = color.hex;
    currentSection.backgroundColor = hex;
    window.RevealEditor.currentSection.setState({ backgroundColor: hex });
    this.props.editor_set_current_section(currentSection);
  };

  handleChangeBackgroundToAll = () => {
    window.RevealEditor.sections.forEach((sec) => {
      sec.setState({ backgroundColor: this.props.editor.currentSection.backgroundColor });
    });
  };

  handleResetAll = () => {
    window.RevealEditor.sections.forEach((sec) => {
      sec.setState({ action: 'RESET_BACKGROUND' });
    });
    const newSec = window.RevealEditor.currentSection.setState({ action: 'RESET_BACKGROUND' });
    this.props.editor_set_current_section(newSec);
  };

  handleReset = () => {
    const newSec = window.RevealEditor.currentSection.setState({ action: 'RESET_BACKGROUND' });
    this.props.editor_set_current_section(newSec);
  }

  styles = reactCSS({
    default: {
      popover: {
        position: 'absolute',
        zIndex: '2',
        margin: '10px',
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

  getColors = () => {
    return ['#b71c1c', '#880e4f', '#4a148c', '#ffcdd2', '#f8bbd0', '#e1bee7', '#311b92', '#1a237e', '#0d47a1', '#d1c4e9', '#c5cae9', '#bbdefb', '#01579b', '#006064', '#004d40', '#b3e5fc', '#b2ebf2', '#b2dfdb', '#1b5e20', '#33691e', '#827717', '#c8e6c9', '#dcedc8', '#f0f4c3', '#f57f17', '#ff6f00', '#e65100', '#fff9c4', '#ffecb3', '#ffe0b2', '#bf360c', '#3e2723', '#263238', '#ffccbc', '#d7ccc8', '#cfd8dc', '#333333', '#222222','#111111', '#ffffff', '#eeeeee','#dddddd']; // eslint-disable-line
  }

  render = () => {
    const colors = this.getColors();
    return (
      <div>
        <div className='background-color-picker'>
          <div className="section-background-square"
          style={ {
            background: 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAMUlEQVQ4T2NkYGAQYcAP3uCTZhw1gGGYhAGBZIA/nYDCgBDAm9BGDWAAJyRCgLaBCAAgXwixzAS0pgAAAABJRU5ErkJggg==")', // eslint-disable-line
          } }
          onTouchTap={ this.handleOpen }
          >
            <div className="color" style={ {
              backgroundColor: this.props.currentSection.backgroundColor,
            } }
            ></div>
          </div>
          <div className="background-buttons">
            <button className={ 'apply-section-background-to-all editor-button' }
              onTouchTap={ this.handleChangeBackgroundToAll }
            >Apply to all
            </button>
            <button className={ 'apply-section-background-to-all editor-button' }
              onTouchTap={ this.handleReset }
            >Reset
            </button>
            <button className={ 'apply-section-background-to-all editor-button' }
              onTouchTap={ this.handleResetAll }
            >Reset All
            </button>
          </div>
        </div>
        <div>
          {this.state.displayColorPicker ?
            <div style={ this.styles.popover }>
              <div style={ this.styles.cover } onTouchTap={ this.handleClose } />
              <BlockPicker colors={ colors } width={ 220 } color={ this.props.currentSection.backgroundColor }
               onChange={ this.handleChangeBackground }
              />
            </div> : null}
        </div>
      </div>
    );
  }
}

BackgroundColorPicker.propTypes = {
  label: PropTypes.string,
  isMain: PropTypes.bool,
  editor: PropTypes.object.isRequired,
  currentSection: PropTypes.object.isRequired,
  editor_set_current_section: PropTypes.func.isRequired,
  editor_set_editor: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    currentSection: state.editor.toJSON().currentSection,
    editor: state.editor.toJSON(),
  };
};

export default create(BackgroundColorPicker, mapStateToProps);
