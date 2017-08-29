import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import svgMap from '../../../../core/svgLib/_svgMap';

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
      Object.keys(svgMap)
      .map((key) => {
        return (<div dangerouslySetInnerHTML={ { __html: svgMap[key] } } className = "add-icon-button" key={ key } data-icon-key={ key } onTouchTap={ this.onSelectIcon }></div>);
      });
    }
    return this.icons;
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
        <BackgroundColorPicker />
        <div className="ui horizontal inverted divider">
          Elements
        </div>
        <button onTouchTap={ this.onAddNewText } className={ 'elements-add-block-option' }>
          <span className={ 'elements-add-block-option-icon' }>
            <i className="font big icon"></i>
          </span>
          <span className={ 'elements-add-block-option-label' }>Text</span>
        </button>
        <button onTouchTap={ this.onAddNewImage } className={ 'elements-add-block-option' }>
          <span className={ 'elements-add-block-option-icon' }>
            <i className="image big icon"></i>
          </span>
          <span className={ 'elements-add-block-option-label' }>Pics</span>
        </button>
        <input onChange={ this.onSelectImage } accept="image/png, image/jpeg" ref={ c => this.imageFileInput = c } type="file" name="file" id="image_file_select" className="inputfile" style={ { display: 'none' } }/>
        <button onTouchTap={ this.onAddSVGShape } className={ 'elements-add-block-option' }>
          <span className={ 'elements-add-block-option-icon' }>
            <i className="square big icon"></i>
          </span>
          <span className={ 'elements-add-block-option-label' }>Shape</span>
        </button>
        <button onTouchTap={ this.onAddSVGIcon } className={ 'elements-add-block-option' }>
          <span className={ 'elements-add-block-option-icon' }>
            <i className="smile big icon"></i>
          </span>
          <span className={ 'elements-add-block-option-label' }>ICON</span>
        </button>
        <button onTouchTap={ this.onAddLatex } className={ 'elements-add-block-option' }>
          <span className={ 'elements-add-block-option-icon' }>
            <i className="superscript big icon"></i>
          </span>
          <span className={ 'elements-add-block-option-label' }>LATEX</span>
        </button>
        <div className="ui inverted fullscreen modal">
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
    // function getDataUri(url, callback) {
    //   const image = new Image();

    //   image.onload = () => {
    //     const canvas = document.createElement('canvas');
    //     canvas.width = image.naturalWidth; // or 'width' if you want a special/scaled size
    //     canvas.height = image.naturalHeight; // or 'height' if you want a special/scaled size

    //     canvas.getContext('2d').drawImage(image, 0, 0);

    //     // Get raw image data
    //     // callback(canvas.toDataURL('image/png').replace(/^data:image\/(png|jpg);base64,/, ''));

    //       // ... or get as Data URI
    //     callback(canvas.toDataURL('image/png'));
    //   };

    //   image.src = url;
    // }

    // // Usage
    // getDataUri(event.currentTarget.value, (dataUri) => {
    //   window.RevealEditor.currentSection.addImage({ imageUrl: dataUri });
    // });
  }

  onSelectIcon = (event) => {
    window.RevealEditor.currentSection
      .addSVGIcon({ icon: event.currentTarget.dataset.iconKey });
    $('.fullscreen.modal').modal('hide');
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
    $('.fullscreen.modal').modal({ allowMultiple: false }).modal('show');
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
