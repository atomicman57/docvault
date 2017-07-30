import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Modal } from 'react-materialize';
import CreateDocument from '../documents/CreateDocument.jsx';
import SearchDocument from '../documents/SearchDocument.jsx';
import ListDocument from '../documents/ListDocument.jsx';
import {
  userSaveDocumentRequest,
  userDeleteDocumentRequest,
  userUpdateDocumentRequest,
  userSearchRequest,
  userPersonalDocumentRequest
} from '../../actions/documentActions';

const MyDocument = ({
  userPersonalDocumentRequest,
  userSaveDocumentRequest,
  userDeleteDocumentRequest,
  userSearchRequest,
  userUpdateDocumentRequest,
  documents,
  currentUser,
  loading
}) => (
  <div>
    <div className="page">
      <main>
        <div className="breadcrumb grey lighten-3">
          <h6>My Documents</h6>
        </div>
        <Modal
          header="Create Document"
          id="create-doc"
          trigger={
            <div className="fixed-action-btn">
              <a className="btn-floating btn-large pink darken-4">
                <i className="large white-text material-icons">edit</i>
              </a>
            </div>
          }
        >
          <CreateDocument
            documentType={'personal'}
            currentUser={currentUser}
            userSaveDocumentRequest={userSaveDocumentRequest}
          />
        </Modal>
        <br />
        <SearchDocument
          documentType={'personal'}
          currentUser={currentUser}
          userSearchRequest={userSearchRequest}
        />
        <br />
        <div className="row">
          <ListDocument
            documentType={'personal'}
            loading={loading}
            userDeleteDocumentRequest={userDeleteDocumentRequest}
            userUpdateDocumentRequest={userUpdateDocumentRequest}
            currentUser={currentUser}
            userDocumentRequest={userPersonalDocumentRequest}
            documents={documents}
          />
        </div>
      </main>
    </div>
  </div>
);

MyDocument.defaultProps = {
  documents: {},
};

MyDocument.propTypes = {
  currentUser: PropTypes.object.isRequired,
  userDeleteDocumentRequest: PropTypes.func.isRequired,
  userUpdateDocumentRequest: PropTypes.func.isRequired,
  userPersonalDocumentRequest: PropTypes.func.isRequired,
  documents: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  loading: PropTypes.number.isRequired
};

/**
 *
 *
 * @param {any} state
 * @returns
 */
function mapStateToProps(state) {
  return {
    currentUser: state.Auth.user,
    documents: state.Document.documents,
    loading: state.ajaxCallsInProgress
  };
}

export default connect(mapStateToProps, {
  userPersonalDocumentRequest,
  userSaveDocumentRequest,
  userDeleteDocumentRequest,
  userUpdateDocumentRequest,
  userSearchRequest
})(MyDocument);
