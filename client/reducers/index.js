import { combineReducers } from 'redux';
import Auth from './authReducer';
import Document from './documentReducer';
import Users from './userReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';

const rootReducer = combineReducers({
  Auth,
  Document,
  Users,
  ajaxCallsInProgress
});
export default rootReducer;
