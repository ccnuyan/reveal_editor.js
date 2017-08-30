import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import IconSelector from './IconSelector';

import svgFilesMap from '../../../../icomoon_icons/svgFilesMap';

import actions from '../../../store/actions';
import './Elements.scss';

import BackgroundColorPicker from './BackgroundColorPicker';

/* eslint-disable max-len */
class Elements extends Component {

  static propTypes = {
    editor: PropTypes.object.isRequired,
    set_editor: PropTypes.func.isRequired,
  }

  getIcons() {
    if (!this.icons) {
      this.icons =
      Object.keys(svgFilesMap)
      .map((key) => {
        return (<span className={ `big svg-icon icon-${key}` } key={ key } data-icon-file={ svgFilesMap[key] } onTouchTap={ this.onSelectIcon }></span>);
      });
    }
    return this.icons;
  }

  render = () => {
    return (
      <div id='editor_elements' className={ 'ui center aligned segment' }>
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
        <BackgroundColorPicker />
        <div className="ui horizontal inverted divider">
          Elements
        </div>
        <div onTouchTap={ this.onAddNewText } className={ 'ui icon button' }>
          <i className="font big icon"></i>
          <span className={ 'elements-add-block-option-label' }>Text</span>
        </div>
        <div onTouchTap={ this.onAddNewImage } className={ 'ui icon button' }>
          <i className="image big icon"></i>
          <span className={ 'elements-add-block-option-label' }>PICTURES</span>
        </div>
        <input onChange={ this.onSelectImage } accept="image/png, image/jpeg" ref={ c => this.imageFileInput = c } type="file" name="file" id="image_file_select" className="inputfile" style={ { display: 'none' } }/>
        <div onTouchTap={ this.onAddSVGShape } className={ 'ui icon button' }>
          <i className="square big icon"></i>
          <span className={ 'elements-add-block-option-label' }>SHAPES</span>
        </div>
        <IconSelector/>
        <div onTouchTap={ this.onAddSVGIcon } className={ 'ui icon button' }>
          <i className="smile big icon"></i>
          <span className={ 'elements-add-block-option-label' }>ICONS</span>
        </div>
        <div onTouchTap={ this.onAddLatex } className={ 'ui icon button' }>
          <i className="superscript big icon"></i>
          <span className={ 'elements-add-block-option-label' }>LATEX</span>
        </div>
        <div className="ui basic inverted modal">
          {this.getIcons()}
        </div>
      </div>
    );
  }

  onSelectImage = () => {
    const reader = new FileReader();
    // const ent = e || window.event;
    const files = this.imageFileInput.files;
    reader.onload = () => {
      const dataURL = reader.result;
      window.RevealEditor.currentSection.addImage({ imageUrl: dataURL });
    };

    reader.readAsDataURL(files[0]);
  }

  onSelectIcon = (event) => {
    window.RevealEditor.currentSection
      .addSVGIcon({ icon: event.currentTarget.dataset.iconFile });
    $('.ui.modal').modal('hide');
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
    this.imageFileInput.click();
  }

  onAddSVGShape = () => {
    event.preventDefault();
    // window.RevealEditor.currentSection.addSVGShape({ shape: 'Rect' });
    // window.RevealEditor.currentSection.addSVGShape({ shape: 'Ellipse' });
    // window.RevealEditor.currentSection.addSVGShape({ shape: 'Circle' });
  }

  onAddSVGIcon = () => {
    event.preventDefault();
    $('.ui.modal').modal({ allowMultiple: false }).modal('show');
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
