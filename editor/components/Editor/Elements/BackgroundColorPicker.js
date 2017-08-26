import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import reactCSS from 'reactcss';
import { BlockPicker } from 'react-color';
import * as material from 'material-colors';

import actions from '../../../store/actions';

class BackgroundColorPicker extends Component {

  static propTypes = {
    label: PropTypes.string,
    isMain: PropTypes.bool,
    editor: PropTypes.object.isRequired,
    currentSection: PropTypes.object.isRequired,
    set_current_section: PropTypes.func.isRequired,
  }

  state = {
    displayColorPicker: false,
  }

  hanleOpen = () => {
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
    this.props.set_current_section(currentSection);
  };

  handleChangeBackgroundToAll = () => {
    window.RevealEditor.sections.forEach((sec) => {
      sec.setState({ backgroundColor: this.props.editor.currentSection.backgroundColor });
    });
  };

  styles = reactCSS({
    default: {
      color: {
        borderWidth: '2px',
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

  getColors = () => {
    const colors = {
      dark: [
        material.red['900'],
        material.pink['900'],
        material.purple['900'],
        material.deepPurple['900'],
        material.indigo['900'],
        material.blue['900'],
        material.lightBlue['900'],
        material.cyan['900'],
        material.teal['900'],
        material.green['900'],
        material.lightGreen['900'],
        material.lime['900'],
        // material.yellow['900'],
        // material.amber['900'],
        material.orange['900'],
        material.deepOrange['900'],
        material.brown['900'],
        material.blueGrey['900'],
      ],
      light: [
        material.red['100'],
        material.pink['100'],
        material.purple['100'],
        material.deepPurple['100'],
        material.indigo['100'],
        material.blue['100'],
        material.lightBlue['100'],
        material.cyan['100'],
        material.teal['100'],
        material.green['100'],
        material.lightGreen['100'],
        material.lime['100'],
        material.yellow['100'],
        // material.amber['100'],
        // material.orange['100'],
        material.deepOrange['100'],
        material.brown['100'],
        material.blueGrey['100'],
      ] };

    if (this.props.editor.theme === 'dark') {
      return colors.dark;
    }
    if (this.props.editor.theme === 'light') {
      return colors.light;
    }
    return [];
  }

  render = () => {
    const colors = this.getColors();
    return (
      <div className="block-option">
        <div className="ui horizontal inverted divider">{this.props.label ? this.props.label : 'Background'}</div>
        <div>
          <div className="two ui buttons">
            <button className="ui inverted button"
            style={ { ...this.styles.color, backgroundColor: this.props.currentSection.backgroundColor } }
            onTouchTap={ this.hanleOpen }
            ></button>
            <button className="ui button"
            onTouchTap={ this.handleChangeBackgroundToAll }
            >To all</button>
          </div>
          { this.state.displayColorPicker ?
            <div style={ this.styles.popover }>
              <div style={ this.styles.cover } onTouchTap={ this.handleClose }/>
              <BlockPicker colors={ colors } width={ 205 } height={ 500 } color={ this.props.editor.background } onChange={ this.handleChangeBackground }/>
            </div> : null }
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
  };
};

export default connect(mapStateToProps, mapActionsToProps)(BackgroundColorPicker);
