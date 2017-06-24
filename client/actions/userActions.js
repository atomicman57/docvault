import axios from 'axios';
import { GET_USERS_SUCCESS, UPDATE_USERS_SUCCESS } from '../actions/types';
import { setCurrentUser } from './authActions';

export function getUsers(users) {
  return {
    type: GET_USERS_SUCCESS,
    users
  };
}

export function updateUser(user) {
  return {
    type: UPDATE_USERS_SUCCESS,
    user
  };
}

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

export function userUpdateUserRequest(user) {
  console.log('user', user);
  return (dispatch) => {
    return axios.put(`/users/${user.id}`, user).then((user) => {
      dispatch(setCurrentUser(user.data));
    });
  };
}
