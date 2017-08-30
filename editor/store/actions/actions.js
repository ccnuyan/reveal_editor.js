import actionTypes from '../actionTypes';

const set_preview = dispatch => () => {
  dispatch({ type: actionTypes.SET_PREVIEW_MODE });
  document.querySelector('.reveal-container').style.left = 0;
  document.querySelector('.editor_panel').style.display = 'none';
};

const set_edit = dispatch => () => {
  dispatch({ type: actionTypes.SET_EDIT_MODE });
  document.querySelector('.reveal-container').style.left = '300px';
  document.querySelector('.previewer_panel').style.display = 'none';
};

const set_editor = dispatch => (editor) => {
  dispatch({ type: actionTypes.SET_EDITOR, payload: editor });
};


const set_current_section = dispatch => (currentSection) => {
  dispatch({ type: actionTypes.SET_CURRENT_SECTION, payload: currentSection });
};

const set_selected_blocks = dispatch => (selectedBlocks) => {
  dispatch({ type: actionTypes.SET_SELECTED_BLOCKS, payload: selectedBlocks });
};

const set_current_block = dispatch => (selectedBlock) => {
  dispatch({ type: actionTypes.SET_CURRENT_BLOCK, payload: selectedBlock });
};

export default {
  set_preview,
  set_editor,
  set_edit,
  set_current_section,
  set_selected_blocks,
  set_current_block,
};
