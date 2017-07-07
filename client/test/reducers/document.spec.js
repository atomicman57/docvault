import expect from 'expect';
import initialState from '../../reducers/initialState';
import documentReducer from '../../reducers/documentReducer';
import * as types from '../../actions/types';

describe('Documents Reducer', () => {
  it('should return empty array for all actions with unknown type', () => {
    const action = {
      type: null
    };
    expect(documentReducer(initialState.documents.length, action)).toEqual(0);
  });

  describe('GET_USER_DOCUMENT_SUCCESS', () => {
    const documents = {
      document: [{ id: 14, title: 'Oh' }],
      pagination: {}
    };
    const result = {
      documents: {
        document: [{ id: 14, title: 'Oh' }],
        pagination: {}
      }
    };
    const action = {
      type: types.GET_USER_DOCUMENT_SUCCESS,
      documents
    };
    it('should return a object that contains Documents', () => {
      expect(documentReducer(initialState.documents, action)).toIncludeKey(
        'documents'
      );
    });
    it('should return data when successful', () => {
      expect(documentReducer(initialState.documents, action)).toEqual(result);
    });
  });

  describe('GET_CURRENT_USER_DOCUMENT_SUCCESS', () => {
    const documents = {
      document: [{ id: 14, title: 'Oh' }],
      pagination: {}
    };
    const result = {
      documents: {
        document: [{ id: 14, title: 'Oh' }],
        pagination: {}
      }
    };
    const action = {
      type: types.GET_CURRENT_USER_DOCUMENT_SUCCESS,
      documents
    };
    it('should return a object that contains Documents', () => {
      expect(documentReducer(initialState.documents, action)).toIncludeKey(
        'documents'
      );
    });
    it('should return data when successful', () => {
      expect(documentReducer(initialState.documents, action)).toEqual(result);
    });
  });

  describe('GET_CURRENT_USER_DOCUMENT_SUCCESS', () => {
    const documents = {
      document: [{ id: 14, title: 'Oh' }],
      pagination: {}
    };
    const result = {
      documents: {
        document: [{ id: 14, title: 'Oh' }],
        pagination: {}
      }
    };
    const action = {
      type: types.GET_CURRENT_USER_DOCUMENT_SUCCESS,
      documents
    };
    it('should return a object that contains Documents', () => {
      expect(documentReducer(initialState.documents, action)).toIncludeKey(
        'documents'
      );
    });
    it('should return data when successful', () => {
      expect(documentReducer(initialState.documents, action)).toEqual(result);
    });
  });

  describe('SAVE_USER_DOCUMENT', () => {
    const documents = {
      document: [{ id: 14, title: 'Oh' }],
      pagination: {}
    };
    const result = {
      documents: {
        document: [{ id: 14, title: 'Oh' }],
        pagination: {}
      }
    };
    const action = {
      type: types.SAVE_USER_DOCUMENT,
      documents
    };
    it('should return a object that contains Documents', () => {
      expect(documentReducer(initialState.documents, action)).toIncludeKey(
        'documents'
      );
    });
    it('should return data when successful', () => {
      expect(documentReducer(initialState.documents, action)).toEqual(result);
    });
  });
});
