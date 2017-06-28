import {
  GET_USERS_SUCCESS
} from '../actions/types';
import initialState from './initialState';
// const initialState = {
//   documents: {}
// };

export default (state = initialState, action = {}) => {
  switch (action.type) {
  case GET_USERS_SUCCESS:
    return Object.assign({}, state, {
      users: action.users
    });

  default:
    return state;
  }
};
