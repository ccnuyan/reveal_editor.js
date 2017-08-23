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
      </div>
    );
    // return (
    //   <div id='editor_elements' className="ui center aligned segment">
    //     <div className="ui list">
    //       <div className="item">
    //         <div className="ui inverted massive icon button" onTouchTap={ this.onAddNewText }>
    //           <i className="font big icon"></i>
    //         </div>
    //       </div>
    //       <div className="item">
    //         <div className="ui inverted massive icon button" onTouchTap={ this.onAddNewImage }>
    //           <i className="image big icon"></i>
    //         </div>
    //       </div>
    //       <div className="item">
    //         <div className="ui inverted massive icon button" onTouchTap={ this.onAddSVGShape }>
    //           <i className="square outline big icon"></i>
    //         </div>
    //       </div>
    //       <div className="item">
    //         <div className="ui inverted massive icon button" onTouchTap={ this.onAddSVGIcon }>
    //           <i className="smile big icon"></i>
    //         </div>
    //       </div>
    //       <div className="item">
    //         <div className="ui inverted massive icon button">
    //           <i className="long arrow right big icon"></i>
    //         </div>
    //       </div>
    //       <div className="item">
    //         <div className="ui inverted massive icon button" onTouchTap={ this.onTest }>
    //           <i className="star big icon"></i>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // );
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
