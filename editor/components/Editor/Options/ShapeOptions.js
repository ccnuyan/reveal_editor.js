import React, { Component } from 'react';

import create from '../../creator';

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

export default create(ShapeOptions, mapStateToProps);
