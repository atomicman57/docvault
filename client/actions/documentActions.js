import axios from 'axios';
import {
  SAVE_USER_DOCUMENT_SUCCESS,
  GET_USER_DOCUMENT_SUCCESS,
  GET_CURRENT_USER_DOCUMENT_SUCCESS,
  DELETE_DOCUMENT,
  UPDATE_DOCUMENT,
  SAVE_DOCUMENT
} from '../actions/types';
import { beginAjaxCall } from './ajaxStatusAction';
import { errorHandler } from '../utils/errorHandler';

/**
 *
 * Get User Documents
 * It get the user documents
 * @export
 * @param {object} documents
 */
export function getUserDocument(documents) {
  return {
    type: GET_USER_DOCUMENT_SUCCESS,
    documents
  };
}

/**
 *
 * Get Current Uset Document
 * It get the current User Documents
 * @export
 * @param {object} documents
 */
export function getCurrentUserDocument(documents) {
  return {
    type: GET_CURRENT_USER_DOCUMENT_SUCCESS,
    documents
  };
}

/**
 *
 * User Document Request
 * It loads all documents
 * @export
 * @param {number} [offset=0]
 * @param {number} [limit=8]
 */
export function userDocumentRequest(offset = 0, limit = 8) {
  return (dispatch) => {
    dispatch(beginAjaxCall());
    return axios
      .get(`/documents?limit=${limit}&offset=${offset}`)
      .then((documents) => {
        dispatch(
          getUserDocument({
            documents: documents.data.document,
            pagination: documents.data.pagination
          })
        );
      })
      .catch((error) => {
        errorHandler(error);
      });
  };
}

/**
 *
 * Save User Document
 * It saves documents
 * @export
 * @param {object} document
 */
export function saveUserDocument(document) {
  return {
    type: SAVE_USER_DOCUMENT_SUCCESS,
    document
  };
}

/**
 * User Personal Document Request
 * It loads all the user created/personal documents
 * @export
 * @param {number} userId The user Id
 */
export function userPersonalDocumentRequest(userId, offset = 0, limit = 8) {
  return (dispatch) => {
    dispatch(beginAjaxCall());
    return axios
      .get(`/users/${userId}/documents?limit=${limit}&offset=${offset}`)
      .then((documents) => {
        dispatch(
          getCurrentUserDocument({
            documents: documents.data.document,
            pagination: documents.data.pagination
          })
        );
      })
      .catch((error) => {
        errorHandler(error);
      });
  };
}

const documentType = (dispatch, doctype, userId) => {
  if (doctype) {
    dispatch(userPersonalDocumentRequest(userId));
  } else {
    dispatch(userDocumentRequest());
  }
};

/**
 *
 * User Delete Document Request
 * It deletes a document
 * @export
 * @param {number} id document Id
 * @param {number} userId user Id
 * @param {string} doctype document Type e.g personal
 */
export function userDeleteDocumentRequest(id, userId, doctype) {
  return (dispatch) => {
    return axios
      .delete(`/documents/${id}`)
      .then(() => {
        documentType(dispatch, doctype, userId);
        dispatch({ type: DELETE_DOCUMENT });
      })
      .catch((error) => {
        errorHandler(error);
      });
  };
}

/**
 *
 * User Update Document Request
 * It update a document
 * @export
 * @param {object} document
 * @param {number} userId User Id
 * @param {string} doctype document Type e.g personal
 */
export function userUpdateDocumentRequest(document, userId, doctype) {
  return (dispatch) => {
    return axios
      .put(`/documents/${document.id}`, document)
      .then(() => {
        documentType(dispatch, doctype, userId);
        dispatch({ type: UPDATE_DOCUMENT });
      })
      .catch((error) => {
        errorHandler(error);
      });
  };
}

/**
 *
 * User Save Document Request
 * It saves a document
 * @export
 * @param {object} document
 * @param {number} userId user Id
 * @param {string} doctype document Type e.g personal
 */
export function userSaveDocumentRequest(document, userId, doctype) {
  return (dispatch) => {
    return axios
      .post('/documents', document)
      .then(() => {
        documentType(dispatch, doctype, userId);
        dispatch({ type: SAVE_DOCUMENT });
      })
      .catch((error) => {
        errorHandler(error);
      });
  };
}

/**
 *
 * User Search request
 * It search for a documents
 * @export
 * @param {string} query query string
 * @param {number} userId user Id
 * @param {string} doctype document Type e.g personal
 */
export function userSearchRequest(query, userId, doctype) {
  const offset = 0, limit = 8;
  return (dispatch) => {
    dispatch(beginAjaxCall());
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
        })
        .catch((error) => {
          errorHandler(error);
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
      })
      .catch((error) => {
        errorHandler(error);
      });
  };
}
