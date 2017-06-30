import expect from 'expect';
import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as docActions from '../../actions/documentActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Document Actions', () => {
  //   describe('GetDocuments', () => {
  //     it('retrieves documents and dispatches LOAD_DOCUMENTS_SUCCESS', () => {
  //       moxios.stubRequest('/documents?limit=9&offset=0', {
  //         status: 200,
  //         response: {
  //           documents: [{ title: 'good' }],
  //           pagination: { limit: 9, offset: 0 }
  //         }
  //       });

  //       const expectedActions = [
  //         { type: 'BEGIN_AJAX_CALL' },
  //         { type: 'GET_USER_DOCUMENT_SUCCESS', documents: [{ title: 'good' }], pagination: { limit: 9, offset: 0 } }
  //       ];
  //       const store = mockStore();

  //       return store.dispatch(docActions.userDocumentRequest())
  //         .then(() => {
  //           expect(store.getActions()).toEqual(expectedActions);
  //         });
  //     });
  //   });

  //   describe('SearchDocument', () => {
  //     it('searches for documents and dispatches SEARCH_SUCCESS', () => {
  //       moxios.stubRequest('/search/documents?q=dms&limit=9&offset=0', {
  //         status: 200,
  //         response: {
  //           rows: [{ title: 'good' }],
  //           metaData: {}
  //         }
  //       });

  //       const expectedActions = [
  //         { type: 'BEGIN_AJAX_CALL' },
  //         { type: 'SEARCH_SUCCESS', searchResult: [{ title: 'good' }], metaData: {}, offset: 0, query: 'dms' }
  //       ];
  //       const store = mockStore();

  //       return store.dispatch(docActions.searchDocument('dms'))
  //         .then(() => {
  //           expect(store.getActions()).toEqual(expectedActions);
  //         });
  //     });
  //   });

  describe('SaveDocument', () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    it('saves a new document and dispatches CREATE_DOCUMENT_SUCCESS', () => {
      moxios.stubRequest('/documents', {
        status: 200,
        // response: { title: 'good' }
      });

      const expectedActions = [
        { type: 'CREATE_DOCUMENT_SUCCESS' },
        { type: 'BEGIN_AJAX_CALL' }
      ];
      const store = mockStore();

      return store
        .dispatch(docActions.userSaveDocumentRequest({ title: 'good' }))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });

    // it('updates a document dispatching UPDATE_DOCUMENT_SUCCESS', () => {
    //   moxios.stubRequest('/documents/1', {
    //     status: 200,
    //     response: { title: 'good' }
    //   });

    //   const expectedActions = [
    //     { type: 'BEGIN_AJAX_CALL' },
    //     { type: 'UPDATE_DOCUMENT_SUCCESS', document: { title: 'good' } }
    //   ];

    //   const store = mockStore({});
    //   return store.dispatch(docActions.userUpdateDocumentRequest({ updateId: 1 }, 1))
    //     .then(() => {
    //       expect(store.getActions()).toEqual(expectedActions);
    //     });
    // });
  });

  // describe('DeleteDocument', () => {
  //   it('deletes a document and dispatches DELETE_DOCUMENT_SUCCESS', () => {
  //     moxios.stubRequest('/documents/3', {
  //       status: 200
  //     });

  //     const expectedActions = [
  //       { type: 'DELETE_DOCUMENT_SUCCESS' },
  //       { type: 'BEGIN_AJAX_CALL' }
  //     ];
  //     const store = mockStore();

  //     return store
  //       .dispatch(docActions.userDeleteDocumentRequest(3, 1))
  //       .then(() => {
  //         expect(store.getActions()).toEqual(expectedActions);
  //       });
  //   });
  // });

  describe('GetDocument', () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    it('fetches a document and dispatches GET_DOCUMENT_SUCCESS', () => {
      moxios.stubRequest('/documents/3', {
        status: 200,
        response: { title: 'good' }
      });

      const expectedActions = [
        { type: 'BEGIN_AJAX_CALL' },
        { type: 'GET_DOCUMENT_SUCCESS', document: { title: 'good' } }
      ];
      const store = mockStore({ document: {} });

      return store.dispatch(docActions.userDocumentRequest()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  describe('GetUserDocuments', () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    it("fetches a user's documents and dispatches GET_USER_DOCUMENTS_SUCCESS", () => {
      moxios.stubRequest('/users/3/documents', {
        status: 200,
        response: { documents: undefined, pagination: {} }
      });

      const expectedActions = [
        { type: 'BEGIN_AJAX_CALL' },
        {
          type: 'GET_CURRENT_USER_DOCUMENT_SUCCESS',
          documents: { documents: undefined, pagination: {} }
        }
      ];
      const store = mockStore();

      return store
        .dispatch(docActions.userPersonalDocumentRequest(3))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });
});
