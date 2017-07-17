import axios from 'axios';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import { SET_CURRENT_USER } from '../actions/types';

/**
 * Set Current User
 * It set the current user
 * @export
 * @param {object} user user details
 * @returns {object}
 */
export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user
  };
}

/**
 *
 * Logout
 * It logs the user out
 * @export
 */
export function logout() {
  return (dispatch) => {
    localStorage.removeItem('jwtToken');
    setAuthorizationToken(false);
    dispatch(setCurrentUser({}));
    dispatch({ type: 'LOGOUT' });
  };
}

/**
 *
 * User Login Request
 * It login the user and set token then dispatch current user
 * @export
 * @param {object} userData user Details
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
 * User Signup Request
 * It register the user and return a token
 * @export
 * @param {object} userData user Details
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
