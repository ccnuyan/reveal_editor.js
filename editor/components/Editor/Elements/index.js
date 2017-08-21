import React, { Component } from 'react';
import { connect } from 'react-redux';

import actions from '../../../store/actions';

class Elements extends Component {
  render = () => {
    return (
      <div id='editor_elements' className="ui center aligned segment">
        <div className="ui list">
          <div className="item">
            <div className="ui inverted massive icon button" onTouchTap={ this.onAddNewText }>
              <i className="font icon"></i>
            </div>
          </div>
          <div className="item">
            <div className="ui inverted massive icon button" onTouchTap={ this.onAddNewImage }>
              <i className="image icon"></i>
            </div>
          </div>
          <div className="item">
            <div className="ui inverted massive icon button" onTouchTap={ this.onAddSVGShape }>
              <i className="square outline icon"></i>
            </div>
          </div>
          <div className="item">
            <div className="ui inverted massive icon button">
              <i className="smile icon"></i>
            </div>
          </div>
          <div className="item">
            <div className="ui inverted massive icon button">
              <i className="long arrow right icon"></i>
            </div>
          </div>
          <div className="item">
            <div className="ui inverted massive icon button" onTouchTap={ this.onTest }>
              <i className="star icon"></i>
            </div>
          </div>
        </div>
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
