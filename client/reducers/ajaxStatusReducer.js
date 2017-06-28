import { BEGIN_AJAX_CALL, END_AJAX_CALL} from '../actions/types';
import initialState from './initialState';

export default function ajaxCallsInProgress(state = initialState.ajaxCallsInProgress, action) {
  const type = action.type;

  if (action.type === BEGIN_AJAX_CALL) {
    return state + 1;
  } 
  else if (action.type.substring(action.type.length - 7) === 'SUCCESS' || action.type === END_AJAX_CALL) {
    return state - 1;
  }

  return state;
}