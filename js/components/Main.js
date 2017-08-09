import React, { Component } from 'react';
import { connect } from 'react-redux';

import Editor from './Editor';
import Previewer from './Previewer';


class Main extends Component {
  render =() => {
    if (this.props.editor.presentation_mode === 'editing') {
      return (<Editor></Editor>);
    }

    if (this.props.editor.presentation_mode === 'previewing') {
      return (<Previewer></Previewer>);
    }

    return <div>unknown mode</div>;
  }
}


const mapStateToProps = (state) => {
  return {
    editor: state.editor.toJSON(),
  };
};

export default connect(mapStateToProps)(Main);
