import axios from 'axios';
import { SAVE_USER_DOCUMENT } from '../actions/types';


export function saveUserDocument(document) {
  return {
    type: SAVE_USER_DOCUMENT,
    document
  };
}


export function userSaveDocumentRequest(document) {
  return (dispatch) => {
    return axios.post('/documents', document).then((documents) => {
        dispatch(saveUserDocument(documents));
    });
  };
}
