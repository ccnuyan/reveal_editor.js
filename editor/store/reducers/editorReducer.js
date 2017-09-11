import { fromJS } from 'immutable';
import actionTypes from '../actionTypes';

const editorInit = fromJS({
  initialized: false,
  currentSection: {
    selectedBlocks: [],
  },
  instant_save_busy: false,
  instant_save_error: false,
  instant_save_content: '',
  instant_save_snapshot: '',
});

/* eslint-disable no-param-reassign */
export default (state = editorInit, action) => {
  switch (action.type) {

    case actionTypes.SET_EDITOR: {
      state = state.merge(fromJS(action.payload));
      return state;
    }

    case actionTypes.SET_EDIT_MODE: {
      state = state.set('status', 'editing');
      return state;
    }

    case actionTypes.SET_PREVIEW_MODE: {
      state = state.set('status', 'previewing');
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

    case actionTypes.INSTANT_SAVE_START: {
      state = state.set('instant_save_busy', true);
      state = state.set('instant_save_error', false);
      return state;
    }

    case actionTypes.INSTANT_SAVE_END: {
      state = state.set('instant_save_busy', false);
      state = state.set('instant_save_error', false);
      state = state.set('instant_save_content', action.payload.content);
      state = state.set('instant_save_snapshot', action.payload.snapshot);
      return state;
    }

    case actionTypes.INSTANT_SAVE_ERROR: {
      state = state.set('instant_save_busy', false);
      state = state.set('instant_save_error', true);
      state = state.set('instant_save_content', '');
      state = state.set('instant_save_snapshot', '');
      return state;
    }

    default: {
      return state;
    }
  }
};
