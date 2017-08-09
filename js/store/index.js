import { combineReducers, createStore } from 'redux';
import reducers from './reducers';

const combined_reducers = combineReducers(reducers);

const store = createStore(
  combined_reducers,
  global.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export default store;
