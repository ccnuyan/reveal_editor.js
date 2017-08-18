import { fromJS } from 'immutable';
import actionTypes from '../actionTypes';

const editorInit = fromJS({
  presentation_mode: 'editing',
});

/* eslint-disable no-param-reassign */
export default (state = editorInit, action) => {
  switch (action.type) {

    case actionTypes.SET_EDIT_MODE: {
      state = state.set('presentation_mode', 'editing');
      return state;
    }

    case actionTypes.SET_PREVIEW_MODE: {
      state = state.set('presentation_mode', 'previewing');
      return state;
    }

    default: {
      return state;
    }
  }
};
