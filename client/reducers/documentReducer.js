import {
  SAVE_USER_DOCUMENT,
  GET_USER_DOCUMENT_SUCCESS,
  GET_CURRENT_USER_DOCUMENT_SUCCESS
} from '../actions/types';
import initialState from './initialState';
// const initialState = {
//   documents: {}
// };

export default (state = initialState, action = {}) => {
  switch (action.type) {
  case SAVE_USER_DOCUMENT:
    return [...state, Object.assign({}, action.documents)];
  case GET_USER_DOCUMENT_SUCCESS:
    return Object.assign({}, state, {
      documents: action.documents
    });
  case GET_CURRENT_USER_DOCUMENT_SUCCESS:
    return Object.assign({}, state, {
      documents: action.documents
    });

  default:
    return state;
  }
};
