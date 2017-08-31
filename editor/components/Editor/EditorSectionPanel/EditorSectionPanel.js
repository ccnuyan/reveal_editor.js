import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import BackgroundColorPicker from './BackgroundColorPicker';
import IconSelector from './IconSelector';
import ShapeSelector from './ShapeSelector';


/* eslint-disable max-len */
class Elements extends Component {

  static propTypes = {
    editor: PropTypes.object.isRequired,
  }

  state ={
    showIcons: false,
    showShapes: false,
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
              <i className="icon-document-landscape"></i>
            </div>
            <span>SHAPES</span>
          </div>
          <div onTouchTap={ this.onAddSVGIcon } className={ 'section-element-each' }>
            <div>
              <i className="icon-smile-o"></i>
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
        <div onTouchTap={ this.hideShapes } className={ `svg-elements-panel${this.state.showShapes ? ' show-up' : ''}` }>
          <ShapeSelector hideShapes={ this.hideShapes } />
        </div>
        <div onTouchTap={ this.hideIcons } className={ `svg-elements-panel${this.state.showIcons ? ' show-up' : ''}` }>
          <IconSelector hideIcons={ this.hideIcons } />
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

  onAddNewText = (event) => {
    event.preventDefault();
    window.RevealEditor.currentSection.addText();
  }

  onAddNewImage = (event) => {
    event.preventDefault();
    this.imageFileInput.click();
  }

  onAddSVGShape = (event) => {
    event.preventDefault();
    this.setState({ showShapes: true });
  }

  onAddSVGIcon = (event) => {
    event.preventDefault();
    this.setState({ showIcons: true });
  }

  hideIcons = () => {
    this.setState({ showIcons: false });
  }

  hideShapes = () => {
    this.setState({ showShapes: false });
  }

  onAddLatex = (event) => {
    event.preventDefault();
    window.RevealEditor.currentSection.addLatex({ latex: 'a^2+2ab+b^2=(a+b)^2' });
  }

  onTest = (event) => {
    event.preventDefault();
  }
}

const mapStateToProps = (state) => {
  return {
    editor: state.editor.toJSON(),
  };
};

export default connect(mapStateToProps)(Elements);
