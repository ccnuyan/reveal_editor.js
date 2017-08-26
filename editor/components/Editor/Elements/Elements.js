import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import actions from '../../../store/actions';
import './Elements.scss';

import BackgroundColorPicker from './BackgroundColorPicker';

class Elements extends Component {

  static propTypes = {
    editor: PropTypes.object.isRequired,
    set_editor: PropTypes.func.isRequired,
  }

  render = () => {
    return (
      <div id='editor_elements' className={ 'elements-list ui center aligned segment' }>
        <div className="ui horizontal inverted divider">
          Theme
        </div>
        <div className="ui buttons">
          <button className="ui icon button" onTouchTap={ this.switchTheme } data-theme="light">
            LIGHT
            <i className="circle thin icon" />
          </button>
          <div className="or"></div>
          <button className="ui right icon button" onTouchTap={ this.switchTheme } data-theme="dark">
            <i className="circle icon" />
            DARK
          </button>
        </div>
        <BackgroundColorPicker/>
        <div className="ui horizontal inverted divider">
          Elements
        </div>
        <button onTouchTap={ this.onAddNewText } className={ 'elements-add-block-option' }>
          <span className={ 'elements-add-block-option-icon' }>
            <i className="font big icon"></i>
          </span>
          <span className={ 'elements-add-block-option-label' }>文字</span>
        </button>
        <button onTouchTap={ this.onAddNewImage } className={ 'elements-add-block-option' }>
          <span className={ 'elements-add-block-option-icon' }>
            <i className="image big icon"></i>
          </span>
          <span className={ 'elements-add-block-option-label' }>图片</span>
        </button>
        <button onTouchTap={ this.onAddSVGShape } className={ 'elements-add-block-option' }>
          <span className={ 'elements-add-block-option-icon' }>
            <i className="square big icon"></i>
          </span>
          <span className={ 'elements-add-block-option-label' }>形状</span>
        </button>
        <button onTouchTap={ this.onAddSVGIcon } className={ 'elements-add-block-option' }>
          <span className={ 'elements-add-block-option-icon' }>
            <i className="smile big icon"></i>
          </span>
          <span className={ 'elements-add-block-option-label' }>图标</span>
        </button>
        <button onTouchTap={ this.onAddLatex } className={ 'elements-add-block-option' }>
          <span className={ 'elements-add-block-option-icon' }>
            <i className="superscript big icon"></i>
          </span>
          <span className={ 'elements-add-block-option-label' }>latex公式</span>
        </button>
      </div>
    );
  }

  switchTheme = (event) => {
    window.RevealEditor.services.theme.loadTheme(event.currentTarget.dataset.theme);
    this.props.editor.theme = event.currentTarget.dataset.theme;
    this.props.set_editor(this.props.editor);
  }

  onAddNewText = () => {
    event.preventDefault();
    window.RevealEditor.currentSection.addText();
  }

  onAddNewImage = () => {
    event.preventDefault();
    window.RevealEditor.currentSection.addImage({ imageUrl: '/test.jpg' });
  }

  onAddSVGShape = () => {
    event.preventDefault();
    window.RevealEditor.currentSection.addSVGShape({ shape: 'Rect' });
    window.RevealEditor.currentSection.addSVGShape({ shape: 'Ellipse' });
    window.RevealEditor.currentSection.addSVGShape({ shape: 'Circle' });
  }

  onAddSVGIcon = () => {
    event.preventDefault();
    window.RevealEditor.currentSection.addSVGIcon({ icon: 'eye' });
  }

  onAddLatex = () => {
    event.preventDefault();
    window.RevealEditor.currentSection.addLatex({ latex: 'a^2+2ab+b^2=(a+b)^2' });
  }


  onTest = () => {
    event.preventDefault();
  }
}

const mapStateToProps = (state) => {
  return {
    editor: state.editor.toJSON(),
  };
};

const mapActionsToProps = (dispacher) => {
  return {
    set_editor: actions.set_editor(dispacher),
  };
};

export default connect(mapStateToProps, mapActionsToProps)(Elements);
