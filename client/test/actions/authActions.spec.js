import expect from 'expect';
import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as AuthActions from '../../actions/authActions';
// import types from '../../actions/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhZG1pbiIsInJvbGVJZCI6MSwiaWF0IjoxNDk2MDA5MjQxLCJleHAiOjE0OTY2MTQwNDF9.hkWYITDnqi7paQjhkqhh5Fe0yAiPf34Ffji9jKHQ_Ik';

describe('Auth Actions', () => {
  describe('Login', () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    it('fetches user token and logs the user in returning LOGIN_SUCCESS', () => {
      moxios.stubRequest('/users/login', {
        status: 200,
        response: {
          token,
          message: 'Login successful'
        }
      });

      const expectedActions = [
        {
          type: 'SET_CURRENT_USER',
          user: {
            id: 1,
            roleId: 1,
            username: 'admin',
            exp: 1496614041,
            iat: 1496009241
          }
        }
      ];
      const store = mockStore({ loggedIn: false, user: {} });

      return store
        .dispatch(
          AuthActions.userLoginRequest({
            username: 'admin',
            password: 'alpine'
          })
        )
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });


  describe('setCurrentUser', () => {
    it('should set current logged in user, SET_CURRENT_USER action', (done) => {
      // arrange
      const user = {
        id: 1,
        name: 'test actions',
        username: 'testreduce',
        email: 'testreduce@gmail.com',
        password: 'password',
        roleId: 2
      };

      const expectedAction = {
        type: 'SET_CURRENT_USER',
        user
      };
      // act
      const action = AuthActions.setCurrentUser(user);
      // assert
      expect(action).toEqual(expectedAction);
      done();
    });
  });
});
