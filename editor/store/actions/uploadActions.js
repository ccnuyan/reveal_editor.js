import actionTypes from '../actionTypes';

const upload_queue = dispatch => ({ file }) => {
  dispatch({ type: actionTypes.UPLOAD_QUEUE, file });
};

const upload_progress = dispatch => ({ file }) => {
  dispatch({ type: actionTypes.UPLOAD_PROGRESS, file });
};

const upload_done = dispatch => ({ file }) => {
  dispatch({ type: actionTypes.UPLOAD_DONE, file });
};

export default {
  upload_queue,
  upload_progress,
  upload_done,
};
