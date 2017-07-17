import axios from 'axios';
import { GET_USERS_SUCCESS, UPDATE_USERS_SUCCESS } from '../actions/types';
import { setCurrentUser } from './authActions';
import { beginAjaxCall } from './ajaxStatusAction';

/**
 *
 * Get Users
 * It gets list of users
 * @export
 * @param {object} users
 */
export function getUsers(users) {
  return {
    type: GET_USERS_SUCCESS,
    users
  };
}

/**
 *
 * Get Users Request
 * It gets users and dispatch getUsers action
 * @export
 * @param {number} [offset=0]
 * @param {number} [limit=8]
 */
export function getUsersRequest(offset = 0, limit = 8) {
  return (dispatch) => {
    dispatch(beginAjaxCall());
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

/**
 *
 * Delete User Request
 * It deletes a user
 * @export
 * @param {number} id
 */
export function DeleteUserRequest(id) {
  return (dispatch) => {
    dispatch(beginAjaxCall());
    return axios.delete(`/users/${id}`).then(() => {
      dispatch({ type: 'DELETE_USER_SUCCESS' });
      dispatch(getUsersRequest());
    });
  };
}

/**
 *
 * User Search Request
 * It search for a user
 * @export
 * @param {object} query
 */
export function userSearchRequest(query) {
  const offset = 0, limit = 8;
  return (dispatch) => {
    dispatch(beginAjaxCall());
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

/**
 *
 * User Update Request
 * It update a user
 * @export
 * @param {object} user
 */
export function userUpdateUserRequest(user) {
  return (dispatch) => {
    return axios.put(`/users/${user.id}`, user).then((user) => {
      dispatch({ type: UPDATE_USERS_SUCCESS });
      dispatch(setCurrentUser(user.data));
    });
  };
}
