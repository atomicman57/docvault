import { combineReducers } from 'redux';
import Auth from './authReducer';
import Document from './documentReducer';
import Users from './userReducer';

const rootReducer = combineReducers({
  Auth,
  Document,
  Users
});
export default rootReducer;
