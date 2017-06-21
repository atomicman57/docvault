import axios from 'axios';
import { SAVE_USER_DOCUMENT, GET_USER_DOCUMENT,GET_CURRENT_USER_DOCUMENT } from '../actions/types';



export function getUserDocument(documents) {
  return {
    type: GET_USER_DOCUMENT,
    documents
  };
}


export function getCurrentUserDocument(documents) {
  return {
    type: GET_CURRENT_USER_DOCUMENT,
    documents
  };
}

export function userDocumentRequest(offset = 0, limit = 8) {
  return (dispatch) => {
    return axios.get(`/documents?limit=${limit}&offset=${offset}`).then((documents) => {
        dispatch(getUserDocument({
          documents: documents.data.document,
          pagination: documents.data.pagination
        }));
    });
  };
}


export function saveUserDocument(document) {
  return {
    type: SAVE_USER_DOCUMENT,
    document
  };
}


export function userSaveDocumentRequest(document) {
  return (dispatch) => {
    return axios.post('/documents', document).then((documents) => {
        dispatch(userDocumentRequest());
    });
  };
}

export function userPersonalDocumentRequest(userId) {
  return (dispatch) => {
    return axios.get(`/users/${userId}/documents`).then((documents) => {
        dispatch(getCurrentUserDocument(documents.data));
    });
  };
}
