import { fromJS, Map } from 'immutable';
import uuid from 'uuid';
import _ from 'lodash';
import { syncTypes, asyncTypes } from '../actionTypes'; //eslint-disable-line
import actionTypes from '../actionTypes'; //eslint-disable-line

const initObject = {};

syncTypes.forEach((tp) => {
  // for each sync action, there is no busy
  initObject[`${tp}_MESSAGE`] = Map({});
});
asyncTypes.forEach((tp) => {
  // for each async action, there is a busy flag
  initObject[`${tp}_BUSY`] = false;
  initObject[`${tp}_MESSAGE`] = Map({});
});

const statusInit = fromJS({
  ...initObject,
  HEADER_MESSAGE: Map({ id: 0 }),
  // before the world start to run, authentication is busy
  USER_TOKEN_AUTHENTICATE_BUSY: true,
});

/* eslint-disable no-param-reassign */
export default (state = statusInit, action) => {
  const breaks = action.type.split('_');

  const actionName = _.join(_.slice(breaks, 0, breaks.length - 1), '_');

  /*
    ui_message:{
      status:
      header:
      inline:
    }
  */

  if (action.type === actionTypes.SET_PRISTINE) {
    if (action.payload && action.payload.action) {
      // set specific action message pristine
      state = state.set(`${action.payload.action}_MESSAGE`, Map({ id: 0 }));
      state = state.set(`${action.payload.action}_BUSY`, false);
    } else {
      // set all actions states pristine
      state = statusInit;
      return state;
    }
  } else if (action.payload && typeof (action.payload.ui_message) === 'object') {
    // it's an regular async action
    const message = {
      ...action.payload.ui_message,
      id: uuid.v4(),
    };
    // set the inline message
    state = state.set(`${actionName}_MESSAGE`, Map(message));
    // set the header message
    state = state.set('HEADER_MESSAGE', Map(message));
  } else {
    // clear the inline message
    state = state.set(`${actionName}_MESSAGE`, Map({}));
    // clear the header message
    state = state.set('HEADER_MESSAGE', Map({ id: 0 }));
  }

  switch (_.last(breaks)) {
    case 'START': {
      state = state.set(`${actionName}_BUSY`, true);
      return state;
    }
    case 'END': {
      state = state.set(`${actionName}_BUSY`, false);
      return state;
    }
    case 'ERROR': {
      state = state.set(`${actionName}_BUSY`, false);
      return state;
    }
    default: {
      return state;
    }
  }
};
