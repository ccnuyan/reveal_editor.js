import React, { Component } from 'react';

import create from '../../creator';

class IconOptions extends Component {
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

export default create(IconOptions, mapStateToProps);
