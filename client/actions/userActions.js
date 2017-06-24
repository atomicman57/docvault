import axios from 'axios';
import { GET_USERS_SUCCESS } from '../actions/types';

export function getUsers(users) {
  return {
    type: GET_USERS_SUCCESS,
    users
  };
}

// export function getUserSearchResult(documents) {
//   return {
//     type: SEARCH_DOCUMENTS,
//     documents
//   };
// }

export function getUsersRequest(offset = 0, limit = 8) {
  return (dispatch) => {
    return axios.get(`/users?limit=${limit}&offset=${offset}`).then((users) => {
      dispatch(
        getUsers({
          users: users.data.users,
          pagination: users.data.pagination
        })
      );
    });
  };
}

// export function saveUserDocument(document) {
//   return {
//     type: SAVE_USER_DOCUMENT,
//     document
//   };
// }

export function DeleteUserRequest(id) {
  return (dispatch) => {
    return axios.delete(`/users/${id}`, document).then(() => {
        dispatch(getUsersRequest());
    });
  };
}

export function userSearchRequest(query) {
  const offset = 0, limit = 8;
  return (dispatch) => {
    return axios
      .get(`/search/users?q=${query}&limit=${limit}&offset=${offset}`)
      .then((users) => {
        dispatch(
          getUsers({
            users: users.data.users,
            pagination: users.data.pagination
          })
        );
      });
  };
}
