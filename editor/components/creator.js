import { connect } from 'react-redux';
// import withStyles from '../providers/stylesProvider';
import actions from '../../store/actions';

export default (component, stateMap) => {
  const mapDispatchToProps = (dispatch) => {
    const dispatchMap = {};
    Object.keys(actions).forEach((key) => {
      Object.keys(actions[key]).forEach((func) => {
        dispatchMap[`${key}_${func}`] = actions[key][func](dispatch);
      });
    });
    return dispatchMap;
  };

  return connect(stateMap, mapDispatchToProps)(component);
};
