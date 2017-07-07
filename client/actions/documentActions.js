import axios from 'axios';
import {
  SAVE_USER_DOCUMENT_SUCCESS,
  GET_USER_DOCUMENT_SUCCESS,
  GET_CURRENT_USER_DOCUMENT_SUCCESS
} from '../actions/types';
import { beginAjaxCall } from './ajaxStatusAction';

/**
 *
 *
 * @export
 * @param {any} documents
 * @returns
 */
export function getUserDocument(documents) {
  return {
    type: GET_USER_DOCUMENT_SUCCESS,
    documents
  };
}

/**
 *
 *
 * @export
 * @param {any} documents
 * @returns
 */
export function getCurrentUserDocument(documents) {
  return {
    type: GET_CURRENT_USER_DOCUMENT_SUCCESS,
    documents
  };
}

/**
 *
 *
 * @export
 * @param {number} [offset=0]
 * @param {number} [limit=8]
 * @returns
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
 *
 * @export
 * @param {any} document
 * @returns
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
 * @param {any} userId
 * @returns
 */
export function userPersonalDocumentRequest(userId) {
  return (dispatch) => {
    dispatch(beginAjaxCall());
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

const documentType = (dispatch, doctype, userId) => {
  if (doctype) {
    dispatch(userPersonalDocumentRequest(userId));
  } else {
    dispatch(userDocumentRequest());
  }
};

/**
 *
 *
 * @export
 * @param {any} id
 * @param {any} userId
 * @param {any} doctype
 * @returns
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
 *
 * @export
 * @param {any} document
 * @param {any} userId
 * @param {any} doctype
 * @returns
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
 *
 * @export
 * @param {any} document
 * @param {any} userId
 * @param {any} doctype
 * @returns
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
 *
 * @export
 * @param {any} query
 * @param {any} userId
 * @param {any} doctype
 * @returns
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
