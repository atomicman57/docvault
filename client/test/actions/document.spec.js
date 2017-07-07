import expect from 'expect';
import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as docActions from '../../actions/documentActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const document = {
  id: 4,
  title: 'You are the one',
  content: 'You are great',
  access: 'public'
};
const documents = [
  {
    title: 'DOCUMENT TEST',
    content: 'test',
    access: 'public',
    userId: 20,
    User: { username: 'you' }
  },
  {
    title: 'DOCUMENT TEST',
    content: 'test',
    access: 'public',
    userId: 20,
    User: { username: 'you' }
  }
];
const pagination = { pageCount: 2, currentPage: 1 };

describe('Document Actions', () => {
  describe('Save Document', () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    it('saves a new document', () => {
      moxios.stubRequest('/documents', {
        status: 200
      });

      const expectedActions = [{ type: 'BEGIN_AJAX_CALL' }];
      const store = mockStore();

      return store
        .dispatch(docActions.userSaveDocumentRequest(document))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });

  describe('Get Documents', () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    it("get a user's documents and dispatches GET_USER_DOCUMENTS_SUCCESS", () => {
      moxios.stubRequest('/documents?limit=8&offset=0', {
        status: 200,
        response: { document: documents, pagination }
      });

      const expectedActions = [
        { type: 'BEGIN_AJAX_CALL' },
        {
          type: 'GET_USER_DOCUMENT_SUCCESS',
          documents: { documents, pagination }
        }
      ];
      const store = mockStore({ documents: [] });

      return store.dispatch(docActions.userDocumentRequest()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  describe('Update Document', () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    it('updates a document', () => {
      moxios.stubRequest('/documents/4', {
        status: 200
      });

      const expectedActions = [
        { type: 'BEGIN_AJAX_CALL' },
        { type: 'BEGIN_AJAX_CALL' }
      ];
      const store = mockStore();

      return store
        .dispatch(docActions.userUpdateDocumentRequest(document))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });

  describe('Delete Document', () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    it('deletes a document and dispatches', () => {
      moxios.stubRequest('/documents/3', {
        status: 200
      });

      const expectedActions = [
        { type: 'BEGIN_AJAX_CALL' }
      ];
      const store = mockStore();

      return store
        .dispatch(docActions.userDeleteDocumentRequest(3))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });

  describe('GetUserDocuments', () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    it("get a user's documents and dispatches GET_USER_DOCUMENTS_SUCCESS", () => {
      moxios.stubRequest('/users/3/documents', {
        status: 200,
        response: { document: documents, pagination }
      });

      const expectedActions = [
        { type: 'BEGIN_AJAX_CALL' },
        {
          type: 'GET_CURRENT_USER_DOCUMENT_SUCCESS',
          documents: { documents, pagination }
        }
      ];
      const store = mockStore({ documents: [] });

      return store
        .dispatch(docActions.userPersonalDocumentRequest(3))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });

  describe('Search Documents', () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    it('searches for documents', () => {
      moxios.stubRequest('/search/documents?q=dms&limit=8&offset=0', {
        status: 200,
        response: { document: documents, pagination }
      });

      const expectedActions = [
        { type: 'BEGIN_AJAX_CALL' },
        {
          type: 'GET_USER_DOCUMENT_SUCCESS',
          documents: { documents, pagination }
        }
      ];
      const store = mockStore({ documents: [] });

      return store.dispatch(docActions.userSearchRequest('dms')).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it('searches for user documents', () => {
      moxios.stubRequest('/users/3/documents?q=dms&limit=8&offset=0', {
        status: 200,
        response: { document: documents, pagination }
      });

      const expectedActions = [
        { type: 'BEGIN_AJAX_CALL' },
        {
          type: 'GET_CURRENT_USER_DOCUMENT_SUCCESS',
          documents: { documents, pagination }
        }
      ];
      const store = mockStore({ documents: [] });

      return store
        .dispatch(docActions.userSearchRequest('dms', 3, 'personal'))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });
});
