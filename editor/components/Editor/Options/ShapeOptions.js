import React, { Component } from 'react';
import { connect } from 'react-redux';

import actions from '../../../store/actions';

class ShapeOptions extends Component {
  render = () => {
    return (
      <div id='editor_elements' className="ui center aligned segment">
        <div>Icon</div>
      </div>
    );
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

export default connect(mapStateToProps, mapActionsToProps)(ShapeOptions);
