import actionTypes from '../actionTypes';

const key = 'id_token';

const getLocalToken = () => {
  return window.localStorage.getItem(key);
};

const getHeaders = () => {
  const headers = new Headers();
  headers.append('content-type', 'application/json');
  headers.append('accept', 'application/json');
  const token = getLocalToken();
  if (token) {
    headers.append('authorization', `bearer ${token}`);
  }
  return headers;
};

// funtions below are actions

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

const instant_save = dispatch => ({ content, snapshot }) => {
  dispatch({ type: actionTypes.INSTANT_SAVE_START });
  const payload = {
    method: 'PUT',
    headers: getHeaders(),
  };

  payload.body = JSON.stringify({
    work_id: window.sc_mode.work_id,
    content,
    snapshot,
  });

  fetch('/api/works', payload)
    .then(res => res.json())
    .then((ret) => {
      dispatch({ type: actionTypes.INSTANT_SAVE_END, payload: ret });
      return true;
    })
    .catch(() => {
      dispatch({ type: actionTypes.INSTANT_SAVE_ERROR });
      return false;
    });
};

export default {
  set_preview,
  set_editor,
  set_edit,
  set_current_section,
  set_selected_blocks,
  set_current_block,
  instant_save,
};
