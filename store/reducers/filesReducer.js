import { fromJS, Map } from 'immutable';
import actionTypes from '../actionTypes';

const filesinit = fromJS({
  uploaded: {
    files: {},
  },
});

/* eslint-disable no-param-reassign */
export default (state = filesinit, action) => {
  switch (action.type) {
    case actionTypes.FILES_GET_UPLOADED_START: {
      state = state.setIn(['uploaded', 'files'], Map({}));
      return state;
    }
    case actionTypes.FILES_GET_UPLOADED_END: {
      action.payload.forEach((file) => {
        file.client_id = file.id;
        state = state.setIn(['uploaded', 'files', file.client_id], Map(file));
      });
      return state;
    }
    case actionTypes.FILES_GET_UPLOADED_ERROR: {
      return state;
    }

    case actionTypes.FILES_UPDATE_START: {
      return state;
    }
    case actionTypes.FILES_UPDATE_END: {
      state = state.setIn(['uploaded', 'files', action.payload.id], Map(action.payload));
      return state;
    }
    case actionTypes.FILES_UPDATE_ERROR: {
      return state;
    }

    case actionTypes.FILES_DELETE_START: {
      return state;
    }
    case actionTypes.FILES_DELETE_END: {
      state = state.deleteIn(['uploaded', 'files', action.payload.id]);
      return state;
    }
    case actionTypes.FILES_DELETE_ERROR: {
      return state;
    }

    case actionTypes.FILES_UPLOAD_GET_TOKEN_START: {
      action.payload.upload_mode = 'initializing';
      action.payload.busy = true;
      action.payload.error = false;
      state = state.setIn(['uploaded', 'files', action.payload.client_id], fromJS(action.payload));
      return state;
    }
    case actionTypes.FILES_UPLOAD_GET_TOKEN_END: {
      action.payload.upload_mode = 'initializing';
      action.payload.busy = false;
      action.payload.error = false;
      state = state.setIn(['uploaded', 'files', action.payload.client_id], fromJS(action.payload));
      return state;
    }
    case actionTypes.FILES_UPLOAD_GET_TOKEN_ERROR: {
      action.payload.upload_mode = 'initializing';
      action.payload.busy = false;
      action.payload.error = true;
      state = state.setIn(['uploaded', 'files', action.payload.client_id], fromJS(action.payload));
      return state;
    }
    case actionTypes.FILES_UPLOAD_PROGRESS_START: {
      action.payload.upload_mode = 'uploading';
      action.payload.busy = true;
      action.payload.error = false;
      state = state.setIn(['uploaded', 'files', action.payload.client_id, 'total'], action.payload.total);
      state = state.setIn(['uploaded', 'files', action.payload.client_id, 'uploaded'], action.payload.uploaded);
      return state;
    }
    case actionTypes.FILES_UPLOAD_PROGRESS_END: {
      action.payload.busy = false;
      action.payload.error = false;
      state = state.deleteIn(['uploaded', 'files', action.payload.client_id]);
      state = state.setIn(['uploaded', 'files', action.payload.client_id], fromJS(action.payload));
      return state;
    }
    case actionTypes.FILES_UPLOAD_PROGRESS_ERROR: {
      action.payload.upload_mode = 'uploading';
      action.payload.busy = false;
      action.payload.error = true;
      state = state.setIn(['uploaded', 'files', action.payload.client_id], fromJS(action.payload));
      return state;
    }

    default: {
      return state;
    }
  }
};
