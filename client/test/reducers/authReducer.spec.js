import expect from 'expect';
import initialState from '../../reducers/initialState';
import authReducer from '../../reducers/authReducer';
import * as types from '../../actions/types';

describe('User Reducer', () => {
  it('should return empty array for all actions with unknown type', () => {
    const action = {
      type: null
    };
    expect(authReducer(initialState.documents.length, action)).toEqual(0);
  });

  describe('SET_CURRENT_USER', () => {
    const users = {
      isAuthenticated: false,
      user: undefined
    };
    const result = {
      isAuthenticated: false,
      user: undefined
    };
    const action = {
      type: types.SET_CURRENT_USER,
      users
    };
    it('should return a object that contains Users', () => {
      expect(authReducer(initialState.users, action)).toIncludeKey('isAuthenticated');
    });
    it('should return data when successful', () => {
      expect(authReducer(initialState.users, action)).toEqual(result);
    });
  });
});
