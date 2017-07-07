import axios from 'axios';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import { SET_CURRENT_USER } from '../actions/types';

/**
 *
 *
 * @export
 * @param {any} user
 * @returns
 */
export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user
  };
}

/**
 *
 *
 * @export
 * @returns
 */
export function logout() {
  return (dispatch) => {
    localStorage.removeItem('jwtToken');
    setAuthorizationToken(false);
    dispatch(setCurrentUser({}));
  };
}

/**
 *
 *
 * @export
 * @param {any} userData
 * @returns
 */
export function userLoginRequest(userData) {
  return (dispatch) => {
    return axios.post('/users/login', userData).then((res) => {
      const token = res.data.token;
      const userDetails = res.data.userInfo;
      localStorage.setItem('jwtToken', token);
      setAuthorizationToken(token);
      dispatch(setCurrentUser(userDetails));
    });
  };
}

/**
 *
 *
 * @export
 * @param {any} userData
 * @returns
 */
export function userSignupRequest(userData) {
  return (dispatch) => {
    return axios.post('/users', userData).then((res) => {
      const token = res.data.token;
      const userDetails = res.data.userDetails;
      localStorage.setItem('jwtToken', token);
      setAuthorizationToken(token);
      dispatch(setCurrentUser(userDetails));
    });
  };
}
