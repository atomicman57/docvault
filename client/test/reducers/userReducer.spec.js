import expect from 'expect';
import initialState from '../../reducers/initialState';
import userReducer from '../../reducers/userReducer';
import * as types from '../../actions/types';

describe('User Reducer', () => {
  it('should return empty array for all actions with unknown type', () => {
    const action = {
      type: null
    };
    expect(userReducer(initialState.documents.length, action)).toEqual(0);
  });

  describe('GET_USERS_SUCCESS', () => {
    const users = {
      id: 1,
      firstname: 'Ade',
      lastname: 'Bade',
      username: 'ememe',
      roleId: 2
    };
    const result = {
      users: {
        id: 1,
        firstname: 'Ade',
        lastname: 'Bade',
        username: 'ememe',
        roleId: 2
      }
    };
    const action = {
      type: types.GET_USERS_SUCCESS,
      users
    };
    it('should return a object that contains Users', () => {
      expect(userReducer(initialState.users, action)).toIncludeKey('users');
    });
    it('should return data when successful', () => {
      expect(userReducer(initialState.users, action)).toEqual(result);
    });
  });
});
