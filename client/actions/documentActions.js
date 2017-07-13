import axios from 'axios';
import {
  SAVE_USER_DOCUMENT_SUCCESS,
  GET_USER_DOCUMENT_SUCCESS,
  GET_CURRENT_USER_DOCUMENT_SUCCESS
} from '../actions/types';
import { beginAjaxCall } from './ajaxStatusAction';

/**
 *
 * Get User Documents
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
      });
  };
}

/**
 *
 * Save User Document
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
 *
 *
 * @export
 * @param {number} userId
 */
export function userPersonalDocumentRequest(userId, offset = 0, limit = 8) {
  return (dispatch) => {
    dispatch(beginAjaxCall());
    return axios.get(`/users/${userId}/documents?limit=${limit}&offset=${offset}`).then((documents) => {
      dispatch(
        getCurrentUserDocument({
          documents: documents.data.document,
          pagination: documents.data.pagination
        })
      );
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
 * @export
 * @param {number} id
 * @param {number} userId
 * @param {string} doctype
 */
export function userDeleteDocumentRequest(id, userId, doctype) {
  return (dispatch) => {
    return axios.delete(`/documents/${id}`).then(() => {
      documentType(dispatch, doctype, userId);
    });
  };
}

/**
 *
 * User Update Document Request
 * @export
 * @param {object} document
 * @param {number} userId
 * @param {string} doctype
 */
export function userUpdateDocumentRequest(document, userId, doctype) {
  return (dispatch) => {
    dispatch(beginAjaxCall());
    return axios.put(`/documents/${document.id}`, document).then(() => {
      documentType(dispatch, doctype, userId);
    });
  };
}

/**
 *
 * User Save Document Request
 * @export
 * @param {object} document
 * @param {number} userId
 * @param {string} doctype
 */
export function userSaveDocumentRequest(document, userId, doctype) {
  return (dispatch) => {
    return axios.post('/documents', document).then(() => {
      documentType(dispatch, doctype, userId);
    });
  };
}

/**
 *
 * User Search request
 * @export
 * @param {string} query
 * @param {number} userId
 * @param {string} doctype
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
          dispatch(getCurrentUserDocument({ documents: documents.data.document,
            pagination: documents.data.pagination
          })
          );
        });
    }
    return axios
      .get(`/search/documents?q=${query}&limit=${limit}&offset=${offset}`)
      .then((documents) => {
        dispatch(getUserDocument({ documents: documents.data.document,
          pagination: documents.data.pagination
        })
        );
      });
  };
}
