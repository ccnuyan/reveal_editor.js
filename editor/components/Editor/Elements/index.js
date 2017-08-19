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
            <div className="ui inverted massive icon button" onTouchTap={ this.onReload }>
              <i className="image icon"></i>
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

  onReload = () => {
    event.preventDefault();
    window.RevealEditor.reload({
      html: `<div class="slides">
                <section>
                    <div class="sl-block" data-block-type="text" style="width: 800px; left: 80px; top: 270px; height: auto;">
                        <div class="sl-block-content" data-placeholder-tag="h1" data-placeholder-text="Title Text">
                            <h1>Title Text</h1>
                        </div>
                    </div>
                </section>
                <section>
                    <div class="sl-block" data-block-type="text" style="width: 800px; left: 80px; top: 70px; height: auto;">
                        <div class="sl-block-content" data-placeholder-tag="h2" data-placeholder-text="Section Title">
                            <h2>Section Title</h2>
                        </div>
                    </div>
                    <div class="sl-block" data-block-type="text" style="width: 800px; left: 80px; top: 210px; height: auto; text-align:left">
                        <div class="sl-block-content" data-placeholder-tag="h2" data-placeholder-text="Content">
                            <p>Content</p>
                        </div>
                    </div>
                </section>
                <section>
                    <div class="sl-block" data-block-type="text" style="width: 720px; left: 80px; top: 70px; height: auto;">
                        <div class="sl-block-content" data-placeholder-tag="h2" data-placeholder-text="Section Title">
                            <h2>Section Title</h2>
                        </div>
                    </div>
                    <div class="sl-block" data-block-type="text" style="width: 720px; left: 160px; top: 210px; height: auto; text-align:left">
                        <div class="sl-block-content" data-placeholder-tag="h2" data-placeholder-text="Content">
                            <p>Content</p>
                        </div>
                    </div>
                </section>
            </div>`,
    });
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
