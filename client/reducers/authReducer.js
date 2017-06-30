import isEmpty from 'lodash/isEmpty';
import { SET_CURRENT_USER } from '../actions/types';
import initialState from './initialState';

export default (state = initialState, action = {}) => {
  switch (action.type) {
  case SET_CURRENT_USER:
    return {
      isAuthenticated: !isEmpty(action.user),
      user: action.user
    };
  default:
    return state;
  }
};
