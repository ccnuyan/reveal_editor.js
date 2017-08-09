import actionTypes from '../actionTypes';

const set_preview = dispatch => () => {
  dispatch({ type: actionTypes.SET_PREVIEW_MODE });
};

const set_edit = dispatch => () => {
  dispatch({ type: actionTypes.SET_EDIT_MODE });
};

export default {
  set_preview,
  set_edit,
};
