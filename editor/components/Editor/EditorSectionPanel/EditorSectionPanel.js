import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import BackgroundColorPicker from './BackgroundColorPicker';
import IconSelector from './IconSelector';
import ShapeSelector from './ShapeSelector';

import PasteOption from '../Options/PasteOption';
import OptionContainer from '../Options/OptionContainer';
import actions from '../../../store/actions';


/* eslint-disable max-len */
class Elements extends Component {
  state ={
    showIcons: false,
    showShapes: false,
  }

  componentDidMount() {
    this.props.initializeQiniu(this.selectImage, this.onImageUploaded);
  }

  onImageUploaded = (imageFile) => {
    console.log(imageFile);
    window.RevealEditor.currentSection.addImage({ file_id: imageFile.id });
  }

  onAddNewText = (event) => {
    event.preventDefault();
    window.RevealEditor.currentSection.addText();
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

  render = () => {
    return (
      <div className={ 'editor_elements' }>
        <div className="panel_title">
          Theme
        </div>
        <BackgroundColorPicker />
        {
          this.props.editor.clipboard ?
            <OptionContainer label="Paste" isMain={ true }><PasteOption/></OptionContainer> : ''
        }
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
          <div ref={ e => this.selectImage = e } onTouchTap={ this.onAddNewImage } className={ 'section-element-each' }>
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
        <div onTouchTap={ this.hideShapes } className={ `svg-elements-panel${this.state.showShapes ? ' show-up' : ''}` }>
          <ShapeSelector hideShapes={ this.hideShapes } />
        </div>
        <div onTouchTap={ this.hideIcons } className={ `svg-elements-panel${this.state.showIcons ? ' show-up' : ''}` }>
          <IconSelector hideIcons={ this.hideIcons } />
        </div>
      </div>
    );
  }
}

Elements.propTypes = {
  editor: PropTypes.object.isRequired,
  initializeQiniu: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    editor: state.editor.toJSON(),
  };
};

const mapActionsToProps = (dispacher) => {
  return {
    initializeQiniu: actions.initialize(dispacher),
  };
};

export default connect(mapStateToProps, mapActionsToProps)(Elements);
