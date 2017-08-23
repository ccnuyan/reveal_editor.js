import actionTypes from '../actionTypes';

const set_preview = dispatch => () => {
  dispatch({ type: actionTypes.SET_PREVIEW_MODE });
  $('#reveal_container').css({ left: '0' });
  $('#editor_panel').css({ display: 'none' });
  $('#preview_panel').css({ display: 'true' });
};

const set_edit = dispatch => () => {
  dispatch({ type: actionTypes.SET_EDIT_MODE });
  $('#reveal_container').css({ left: '200px' });
  $('#editor_panel').css({ display: 'true' });
  $('#preview_panel').css({ display: 'none' });
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
  set_edit,
  set_current_section,
  set_selected_blocks,
  set_current_block,
};
