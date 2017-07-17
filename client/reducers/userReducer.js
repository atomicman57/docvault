import {
  GET_USERS_SUCCESS
} from '../actions/types';
import initialState from './initialState';

export default (state = initialState, action = {}) => {
  switch (action.type) {
  case GET_USERS_SUCCESS:
    return { ...state, users: action.users };

  default:
    return state;
  }
};
