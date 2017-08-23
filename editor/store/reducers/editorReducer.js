import { fromJS } from 'immutable';
import actionTypes from '../actionTypes';


const currentSection = {
  h: 0,
  v: 0,
  initialized: false,
  selectedBlocks: [],
};

if (window.RevealEditor.currentSection) {
  currentSection.initialized = true;
  currentSection.h = window.RevealEditor.currentSection.state.h;
  currentSection.v = window.RevealEditor.currentSection.state.v;
}

const editorInit = fromJS({
  presentation_mode: 'editing',
  currentSection,
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
