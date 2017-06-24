import axios from 'axios';
import {
  SAVE_USER_DOCUMENT,
  GET_USER_DOCUMENT_SUCCESS,
  GET_CURRENT_USER_DOCUMENT_SUCCESS
} from '../actions/types';

export function getUserDocument(documents) {
  return {
    type: GET_USER_DOCUMENT_SUCCESS,
    documents
  };
}

export function getCurrentUserDocument(documents) {
  return {
    type: GET_CURRENT_USER_DOCUMENT_SUCCESS,
    documents
  };
}

export function userDocumentRequest(offset = 0, limit = 8) {
  return (dispatch) => {
    return axios
      .get(`/documents?limit=${limit}&offset=${offset}`)
      .then((documents) => {
        dispatch(
          getUserDocument({
            documents: documents.data.document,
            pagination: documents.data.pagination
          })
        );
      });
  };
}

export function saveUserDocument(document) {
  return {
    type: SAVE_USER_DOCUMENT,
    document
  };
}

export function userPersonalDocumentRequest(userId) {
  return (dispatch) => {
    return axios.get(`/users/${userId}/documents`).then((documents) => {
      dispatch(
        getCurrentUserDocument({
          documents: documents.data.document,
          pagination: documents.data.pagination
        })
      );
    });
  };
}

export function userDeleteDocumentRequest(id, userId, doctype) {
  return (dispatch) => {
    return axios.delete(`/documents/${id}`, document).then(() => {
      console.log('doctype', doctype);
      if (doctype) {
        dispatch(userPersonalDocumentRequest(userId));
      } else {
        dispatch(userDocumentRequest());
      }
    });
  };
}

export function userUpdateDocumentRequest(document, userId, doctype) {
  return (dispatch) => {
    return axios.put(`/documents/${document.id}`, document).then(() => {
      if (doctype) {
        dispatch(userPersonalDocumentRequest(userId));
      } else {
        dispatch(userDocumentRequest());
      }
    });
  };
}

export function userSaveDocumentRequest(document, userId, doctype) {
  return (dispatch) => {
    return axios.post('/documents', document).then(() => {
      if (doctype) {
        dispatch(userPersonalDocumentRequest(userId));
      } else {
        dispatch(userDocumentRequest());
      }
    });
  };
}

export function userSearchRequest(query, userId, doctype) {
  const offset = 0, limit = 8;
  return (dispatch) => {
    if (doctype) {
      return axios
        .get(
          `/users/${userId}/documents?q=${query}&limit=${limit}&offset=${offset}`
        )
        .then((documents) => {
          dispatch(
            getCurrentUserDocument({
              documents: documents.data.document,
              pagination: documents.data.pagination
            })
          );
        });
    }
    return axios
      .get(`/search/documents?q=${query}&limit=${limit}&offset=${offset}`)
      .then((documents) => {
        dispatch(
          getUserDocument({
            documents: documents.data.document,
            pagination: documents.data.pagination
          })
        );
      });
  };
}
