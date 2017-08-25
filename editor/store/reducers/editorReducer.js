import { fromJS } from 'immutable';
import actionTypes from '../actionTypes';

const editorInit = fromJS({
  initialized: false,
  currentSection: {
    selectedBlocks: [],
  },
});

/* eslint-disable no-param-reassign */
export default (state = editorInit, action) => {
  switch (action.type) {

    case actionTypes.SET_EDITOR: {
      state = state.merge(fromJS(action.payload));
      return state;
    }

    case actionTypes.SET_EDIT_MODE: {
      state = state.set('mode', 'editing');
      return state;
    }

    case actionTypes.SET_PREVIEW_MODE: {
      state = state.set('mode', 'previewing');
      return state;
    }

    case actionTypes.SET_CURRENT_SECTION: {
      state = state.set('currentSection', fromJS(action.payload));
      return state;
    }

    case actionTypes.SET_SELECTED_BLOCKS: {
      state = state.setIn(['currentSection', 'selectedBlocks'], fromJS(action.payload));
      return state;
    }

    case actionTypes.SET_CURRENT_BLOCK: {
      state = state.setIn(['currentSection', 'selectedBlocks'], fromJS([action.payload]));
      return state;
    }

    default: {
      return state;
    }
  }
};
