import expect from 'expect';
import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as AuthActions from '../../actions/authActions';
import setAuthorizationToken from '../../utils/setAuthorizationToken';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const token = process.env.TEST_TOKEN;

describe('Auth Actions', () => {
  describe('Login', () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());
    it('gets user token and logs the user in', () => {
      moxios.stubRequest('/users/login', {
        status: 200,
        response: {
          token,
          message: 'Login successful here is your details:',
          userInfo: {
            id: 3,
            username: 'Amala',
            firstname: 'Eba',
            lastname: 'Amala',
            email: 'ama@la.com',
            roleId: 1
          }
        }
      });

      const expectedActions = [
        {
          type: 'SET_CURRENT_USER',
          user: {
            id: 3,
            username: 'Amala',
            firstname: 'Eba',
            lastname: 'Amala',
            email: 'ama@la.com',
            roleId: 1
          }
        }
      ];
      const store = mockStore({ isAutheticated: false, user: {} });
      AuthActions.logout();
      setAuthorizationToken(false);
      return store
        .dispatch(
          AuthActions.userLoginRequest({
            email: 'ama@la.com',
            password: 'amala'
          })
        )
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });

  describe('setCurrentUser', () => {
    it('should set current logged in user, SET_CURRENT_USER action', (done) => {
      const user = {
        id: 1,
        firstname: 'test',
        lastname: 'testing',
        username: 'testactions',
        email: 'testreduce@gmail.com',
        password: 'password',
        roleId: 2
      };

      const expectedAction = {
        type: 'SET_CURRENT_USER',
        user
      };
      const action = AuthActions.setCurrentUser(user);
      expect(action).toEqual(expectedAction);
      done();
    });
  });

  describe('Sign Up', () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    it('should signup the user and gets user token', () => {
      moxios.stubRequest('/users', {
        status: 200,
        response: {
          token,
          userDetails: {
            id: 3,
            username: 'Amala',
            firstname: 'Eba',
            lastname: 'Amala',
            email: 'ama@la.com',
            roleId: 1
          }
        }
      });

      const expectedActions = [
        {
          type: 'SET_CURRENT_USER',
          user: {
            id: 3,
            username: 'Amala',
            firstname: 'Eba',
            lastname: 'Amala',
            email: 'ama@la.com',
            roleId: 1
          }
        }
      ];
      const store = mockStore({ isAutheticated: false, user: {} });

      return store
        .dispatch(
          AuthActions.userSignupRequest({
            username: 'Amala',
            firstname: 'Eba',
            lastname: 'Amala',
            email: 'ama@la.com',
            password: 'testpass'
          })
        )
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });
});
