import { combineReducers } from 'redux';
import Auth from './authReducer';
import Document from './documentReducer';

const rootReducer = combineReducers({
  Auth,
  Document,
});
export default rootReducer;
