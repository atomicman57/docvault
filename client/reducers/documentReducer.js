import { SAVE_USER_DOCUMENT } from '../actions/types';

const initialState = {
  isAuthenticated: false,
  document: {}
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
  case SAVE_USER_DOCUMENT:
    return {
      document: action.document
    };
  default:
    return state;
  }
};
