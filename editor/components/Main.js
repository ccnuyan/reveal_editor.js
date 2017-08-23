import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Editor from './Editor';
import Previewer from './Previewer';

import actions from '../store/actions';


class Main extends Component {

  static propTypes = {
    editor: PropTypes.object.isRequired,
    currentSection: PropTypes.object.isRequired,
    set_current_section: PropTypes.func.isRequired,
    set_selected_blocks: PropTypes.func.isRequired,
  }

  constructor() {
    super();
    window.RevealEditor.emitter.on('editorInitialized', (event) => {
      const currentSection = {
        selectedBlocks: [],
      };
      currentSection.initialized = true;
      currentSection.h = event.currentSection.state.h;
      currentSection.v = event.currentSection.state.v;
      this.props.set_current_section(currentSection);
    });
    window.RevealEditor.emitter.on('editorCurrentBlocksChanged', (event) => {
      const selectedBlocks = [];
      event.selectedBlocks.forEach((block) => {
        selectedBlocks.push(block.state);
      });
      this.props.set_selected_blocks(selectedBlocks);
    });
    window.RevealEditor.emitter.on('editorRequestEditImage', (event) => {
      console.log(event);
    });
    window.RevealEditor.emitter.on('editorCurrentSlideChanged', (event) => {
      const currentSection = {
        selectedBlocks: [],
      };
      currentSection.initialized = true;
      currentSection.h = event.currentSection.state.h;
      currentSection.v = event.currentSection.state.v;
      this.props.set_current_section(currentSection);
    });
  }

  render =() => {
    if (this.props.editor.presentation_mode === 'editing' && this.props.currentSection.initialized) {
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
    currentSection: state.editor.toJSON().currentSection,
  };
};

const mapActionsToProps = (dispacher) => {
  return {
    set_current_section: actions.set_current_section(dispacher),
    set_selected_blocks: actions.set_selected_blocks(dispacher),
  };
};


export default connect(mapStateToProps, mapActionsToProps)(Main);
