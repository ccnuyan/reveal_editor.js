import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import actions from '../../store/actions';

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
      <div id="preview_panel">
        <div className="ui icon button" onTouchTap={ this.toEdit }>
          <i className="edit icon"></i>
        </div>
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
