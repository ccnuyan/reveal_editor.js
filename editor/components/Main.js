import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Editor from './Editor/Editor';
import Previewer from './Editor/Manipulations/Previewer';

import actions from '../store/actions';


class Main extends Component {

  static propTypes = {
    editor: PropTypes.object.isRequired,
    currentSection: PropTypes.object.isRequired,
    set_editor: PropTypes.func.isRequired,
    set_current_section: PropTypes.func.isRequired,
    set_selected_blocks: PropTypes.func.isRequired,
  }

  addEventListeners = () => {
    window.RevealEditor.emitter.on('editorCurrentBlocksChanged', (event) => {
      this.props.set_selected_blocks(event.selectedBlocks);
    });
    window.RevealEditor.emitter.on('editorCurrentSlideChanged', (event) => {
      this.props.set_current_section(event.currentSection);
    });

    window.RevealEditor.emitter.on('editorRequestEditImage', (event) => {
      console.log(event);
    });
  }

  componentDidMount() {
    if (window.RevealEditor) {
      console.log('window.RevealEditor true');
      if (window.RevealEditor.state.initialized) {
        console.log('window.RevealEditor initialized');
        const editor = window.RevealEditor.getState();
        this.props.set_editor(editor);
        this.addEventListeners();
      } else {
        window.RevealEditor.emitter.on('editorInitialized', (event) => {
          this.props.set_editor(event.editor);
          this.addEventListeners();
        });
      }
    } else {
      console.log('window.RevealEditor false');
    }
  }

  render =() => {
    if (this.props.editor.status === 'editing' && this.props.editor.initialized) {
      return (<Editor></Editor>);
    }

    if (this.props.editor.status === 'previewing') {
      return (<Previewer></Previewer>);
    }

    return <div>LOADING</div>;
  }
}


const mapStateToProps = (state) => {
  return {
    editor: state.editor.toJSON(),
    currentSection: state.editor.toJSON().currentSection,
  };
};

const mapActionsToProps = (dispacher) => {
  return {
    set_editor: actions.set_editor(dispacher),
    set_current_section: actions.set_current_section(dispacher),
    set_selected_blocks: actions.set_selected_blocks(dispacher),
  };
};


export default connect(mapStateToProps, mapActionsToProps)(Main);
