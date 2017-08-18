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

export default {
  set_preview,
  set_edit,
};
