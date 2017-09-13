import React, { Component } from 'react';
import PropTypes from 'prop-types';

import create from '../../creator';

class Previewer extends Component {
  toEdit = () => {
    window.RevealEditor.toEdit();
    this.props.editor_set_edit();
  }

  render =() => {
    return (
      <div className="previewer_panel">
        <button onTouchTap={ this.toEdit }>
          <i className="icon-edit"></i>
        </button>
      </div>);
  }
}

const mapStateToProps = (state) => {
  return {
    editor: state.editor.toJSON(),
  };
};

Previewer.propTypes = {
  editor_set_edit: PropTypes.func.isRequired,
};

export default create(Previewer, mapStateToProps);
