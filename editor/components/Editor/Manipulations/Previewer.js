import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import actions from '../../../store/actions';

class Previewer extends Component {

  static propTypes = {
    set_edit: PropTypes.func.isRequired,
  }

  toEdit = () => {
    window.RevealEditor.toEdit();
    this.props.set_edit();
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

const mapActionsToProps = (dispacher) => {
  return {
    set_edit: actions.set_edit(dispacher),
  };
};


export default connect(mapStateToProps, mapActionsToProps)(Previewer);
