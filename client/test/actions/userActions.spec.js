import expect from 'expect';
import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as userActions from '../../actions/userActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const user = {
  id: 4,
  firstname: 'Amala',
  lastname: 'Eba',
  username: 'Me',
  email: 'amala@ama.com',
  password: 'amala'
};
const users = [
  {
    id: 6,
    firstname: 'Iyan',
    lastname: 'Poundo',
    username: 'Yam',
    email: 'Iyan@pounded.com',
    password: 'poundedyam'
  },
  {
    id: 7,
    firstname: 'Rice',
    lastname: 'Fried',
    username: 'Jollof',
    email: 'naijajollof@rice.com',
    password: 'nigeriajollof'
  }
];
const pagination = { pageCount: 2, currentPage: 1 };

describe('User Actions', () => {
  describe('Get Users', () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    it('get all users', () => {
      moxios.stubRequest('/users?limit=8&offset=0', {
        status: 200,
        response: { users, pagination }
      });

      const expectedActions = [
        { type: 'BEGIN_AJAX_CALL' },
        {
          type: 'GET_USERS_SUCCESS',
          users: { users, pagination }
        }
      ];
      const store = mockStore({ documents: [] });

      return store.dispatch(userActions.getUsersRequest()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  describe('Update a User', () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    it('updates a user dispatching UUPDATE_USERS_SUCCESS', () => {
      moxios.stubRequest('/users/4', {
        status: 200,
        response: { user }
      });

      const expectedActions = [
        {
          type: 'UPDATE_USERS_SUCCESS',
        },
        { type: 'SET_CURRENT_USER', user: { user } }
      ];
      const store = mockStore();

      return store
        .dispatch(userActions.userUpdateUserRequest(user))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });

  describe('Delete a User', () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    it('deletes a user and dispatches DELETE_USER_SUCCESS', () => {
      moxios.stubRequest('/users/3', {
        status: 200
      });

      const expectedActions = [
        { type: 'BEGIN_AJAX_CALL' },
        {
          type: 'DELETE_USER_SUCCESS'
        },
        { type: 'BEGIN_AJAX_CALL' }
      ];
      const store = mockStore();

      return store
        .dispatch(userActions.DeleteUserRequest(3))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });

  describe('Search Users', () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    it('searches for users and dispatches SEARCH_SUCCESS', () => {
      moxios.stubRequest('/search/users?q=atom&limit=8&offset=0', {
        status: 200,
        response: { users, pagination }
      });

      const expectedActions = [
        { type: 'BEGIN_AJAX_CALL' },
        {
          type: 'GET_USERS_SUCCESS',
          users: { users, pagination }
        }
      ];
      const store = mockStore({ users: [] });

      return store.dispatch(userActions.userSearchRequest('atom')).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });
});
