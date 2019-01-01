import { combineReducers } from 'redux';
import activeElement from './activeElement';
import userData from './userData';

export default combineReducers({
  activeElement,
  userData
});
