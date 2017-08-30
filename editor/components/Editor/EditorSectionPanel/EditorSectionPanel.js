import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import svgFilesMap from '../../../../icomoon_icons/svgFilesMap';
import BackgroundColorPicker from './BackgroundColorPicker';

/* eslint-disable max-len */
class Elements extends Component {

  static propTypes = {
    editor: PropTypes.object.isRequired,
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
      <div className={ 'editor_elements' }>
        <div className="panel_title">
          Theme
        </div>
        <BackgroundColorPicker />
        <div className="panel_title">
          Add
        </div>
        <div className="section-elements">
          <div onTouchTap={ this.onAddNewText } className={ 'section-element-each' }>
            <div>
              <i className="icon-font"></i>
            </div>
            <span>TEXT</span>
          </div>
          <div onTouchTap={ this.onAddNewImage } className={ 'section-element-each' }>
            <div>
              <i className="icon-image"></i>
            </div>
            <span>PICTURES</span>
          </div>
          <div onTouchTap={ this.onAddSVGShape } className={ 'section-element-each' }>
            <div>
              <i className="icon-circle"></i>
            </div>
            <span>SHAPES</span>
          </div>
          <div onTouchTap={ this.onAddSVGIcon } className={ 'section-element-each' }>
            <div>
              <i className="icon-cube"></i>
            </div>
            <span>ICONS</span>
          </div>
          <div onTouchTap={ this.onAddLatex } className={ 'section-element-each' }>
            <div>
              <i className="icon-superscript"></i>
            </div>
            <span>LATEX</span>
          </div>
        </div>
        <input onChange={ this.onSelectImage } accept="image/png, image/jpeg" ref={ c => this.imageFileInput = c } type="file" name="file" id="image_file_select" className="inputfile" style={ { display: 'none' } }/>
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

export default connect(mapStateToProps)(Elements);
