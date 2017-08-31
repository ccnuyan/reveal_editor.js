import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Manipulations from './Manipulations/Manipulations';
import EditorSectionPanel from './EditorSectionPanel/EditorSectionPanel';
import Options from './Options/Options';

class Editor extends Component {

  static propTypes = {
    editor: PropTypes.object.isRequired,
    currentSection: PropTypes.object.isRequired,
    selectedBlocks: PropTypes.array.isRequired,
  }

  render =() => {
    return (
      <div className='editor_panel'>
        <Manipulations></Manipulations>
        <div className={ this.props.selectedBlocks.length ? 'panel-activated' : 'panel-deactivated' }>
          <Options></Options>
        </div>
        <div className={ this.props.selectedBlocks.length ? 'panel-deactivated' : 'panel-activated' }>
          <EditorSectionPanel></EditorSectionPanel>
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    editor: state.editor.toJSON(),
    currentSection: state.editor.toJSON().currentSection,
    selectedBlocks: state.editor.toJSON().currentSection.selectedBlocks,
  };
};

export default connect(mapStateToProps)(Editor);
