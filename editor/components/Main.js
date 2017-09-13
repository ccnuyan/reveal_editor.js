import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Editor from './Editor/Editor';
import Previewer from './Editor/Manipulations/Previewer';
import create from './creator';

class Main extends Component {
  addEventListeners = () => {
    window.RevealEditor.emitter.on('editorCurrentBlocksChanged', (event) => {
      this.props.editor_set_selected_blocks(event.selectedBlocks);
    });
    window.RevealEditor.emitter.on('editorCurrentSlideChanged', (event) => {
      this.props.editor_set_current_section(event.currentSection);
    });
    // window.RevealEditor.emitter.on('editorRequestEditImage', (event) => {
    //   console.log(event);
    // });

    setInterval(() => {
      const ct = window.RevealEditor.services.snapshot.getContent();
      if (ct.content !== this.props.editor.instant_save_content) {
        this.props.editor_instant_save(ct);
      }
    }, 5000);
  }

  componentDidMount() {
    if (window.RevealEditor.state.initialized) {
      const editor = window.RevealEditor.getState();
      this.props.editor_set_editor(editor);
      this.addEventListeners();
    } else {
      window.RevealEditor.emitter.on('editorInitialized', (event) => {
        this.props.editor_set_editor(event.editor);
        this.addEventListeners();
      });
    }
  }

  render = () => {
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

Main.propTypes = {
  editor: PropTypes.object.isRequired,
  currentSection: PropTypes.object.isRequired,
  editor_set_editor: PropTypes.func.isRequired,
  editor_set_current_section: PropTypes.func.isRequired,
  editor_set_selected_blocks: PropTypes.func.isRequired,
  editor_instant_save: PropTypes.func.isRequired,
};


export default create(Main, mapStateToProps);
