import React, { Component } from 'react';
import { connect } from 'react-redux';

import actions from '../../../store/actions';
import './index.scss';

class Elements extends Component {

  render = () => {
    return (
      <div id='editor_elements' className={ 'elements-list ui center aligned segment' }>
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
          <span className={ 'elements-add-block-option-label' }>Latex公式</span>
        </button>
      </div>
    );
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
    add_new_text: actions.set_preview(dispacher),
  };
};

export default connect(mapStateToProps, mapActionsToProps)(Elements);
