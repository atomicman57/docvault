import { SAVE_USER_DOCUMENT, GET_USER_DOCUMENT, GET_CURRENT_USER_DOCUMENT} from '../actions/types';

const initialState = {
  documents: {}
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
  case SAVE_USER_DOCUMENT:
    return [...state, Object.assign({}, action.documents)];
  case GET_USER_DOCUMENT:
    return action.documents;
  case GET_CURRENT_USER_DOCUMENT:
    return action.documents;

  default:
    return state;
  }
};
