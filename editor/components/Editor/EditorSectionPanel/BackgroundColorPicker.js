import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import reactCSS from 'reactcss';
import { BlockPicker } from 'react-color';

import actions from '../../../store/actions';

class ThemeAndBackgroundColorPicker extends Component {

  static propTypes = {
    label: PropTypes.string,
    isMain: PropTypes.bool,
    editor: PropTypes.object.isRequired,
    currentSection: PropTypes.object.isRequired,
    set_current_section: PropTypes.func.isRequired,
    set_editor: PropTypes.func.isRequired,
  }

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
    this.props.editor.theme = event.currentTarget.dataset.theme;
    this.props.set_editor(this.props.editor);
  }

  handleChangeBackground = (color) => {
    const currentSection = this.props.currentSection;
    const hex = color.hex;
    currentSection.backgroundColor = hex;
    window.RevealEditor.currentSection.setState({ backgroundColor: hex });
    this.props.set_current_section(currentSection);
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
          style={ { backgroundColor: this.props.currentSection.backgroundColor } }
          onTouchTap={ this.handleOpen }
          ></div>
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

const mapStateToProps = (state) => {
  return {
    currentSection: state.editor.toJSON().currentSection,
    editor: state.editor.toJSON(),
  };
};

const mapActionsToProps = (dispacher) => {
  return {
    set_current_section: actions.set_current_section(dispacher),
    set_editor: actions.set_editor(dispacher),
  };
};

export default connect(mapStateToProps, mapActionsToProps)(ThemeAndBackgroundColorPicker);
