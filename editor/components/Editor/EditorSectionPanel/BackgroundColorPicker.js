import React, { Component } from 'react';
import PropTypes from 'prop-types';
import reactCSS from 'reactcss';
import { BlockPicker } from 'react-color';
import create from '../../creator';

class ThemeAndBackgroundColorPicker extends Component {

  state = {
    displayColorPicker: false,
  }

  handleOpen = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker });
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false });
  };

  switchTheme = (event) => {
    window.RevealEditor.services.theme.loadTheme(event.currentTarget.dataset.theme);
    this.props.editor.theme = event.currentTarget.getAttribute('data-theme');
    this.props.editor_set_editor(this.props.editor);
  }

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
    return ['#b71c1c', '#880e4f', '#4a148c', '#311b92', '#1a237e', '#0d47a1', '#01579b', '#006064', '#004d40', '#1b5e20', '#33691e', '#827717', '#f57f17', '#ff6f00', '#e65100', '#bf360c', '#3e2723', '#263238', '#ffcdd2', '#f8bbd0', '#e1bee7', '#d1c4e9', '#c5cae9', '#bbdefb', '#b3e5fc', '#b2ebf2', '#b2dfdb', '#c8e6c9', '#dcedc8', '#f0f4c3', '#fff9c4', '#ffecb3', '#ffe0b2', '#ffccbc', '#d7ccc8', '#cfd8dc', '#ffffff', '#eeeeee','#dddddd', '#333333', '#222222','#111111']; // eslint-disable-line
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
              borderRadius: 'inherit',
              width: '100%',
              height: '100%',
              backgroundColor: this.props.currentSection.backgroundColor,
            } }
            ></div>
          </div>
          <button className={ 'apply-section-background-to-all editor-button' }
              onTouchTap={ this.handleChangeBackgroundToAll }
          >Apply to all</button>
        </div>
        <div>
          {this.state.displayColorPicker ?
            <div style={ this.styles.popover }>
              <div style={ this.styles.cover } onTouchTap={ this.handleClose } />
              <BlockPicker colors={ colors } width={ 220 } color={ this.props.currentSection.backgroundColor } onChange={ this.handleChangeBackground } />
            </div> : null}
        </div>
      </div>
    );
  }
}

ThemeAndBackgroundColorPicker.propTypes = {
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

export default create(ThemeAndBackgroundColorPicker, mapStateToProps);
