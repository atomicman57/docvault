import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Modal } from 'react-materialize';
import ListDocument from '../documents/ListDocument.jsx';
import SearchDocument from '../documents/SearchDocument.jsx';
import CreateDocument from '../documents/CreateDocument.jsx';


import {
  userDocumentRequest,
  userDeleteDocumentRequest,
  userUpdateDocumentRequest,
  userSearchRequest,
  userSaveDocumentRequest
} from '../../actions/documentActions';

/**
 *
 *
 * @class Dashboard
 * @extends {React.Component}
 */
const Dashboard = ({
  currentUser,
  userSaveDocumentRequest,
  userDocumentRequest,
  userDeleteDocumentRequest,
  userSearchRequest,
  userUpdateDocumentRequest,
  documents,
  loading
}) => (
  <div>
    <div className="page">
      <main>
        <div className="breadcrumb grey lighten-3">
          <h6>
            Dashboard
          </h6>
        </div>
        <br />
        <SearchDocument
          userSearchRequest={userSearchRequest}
          currentUser={currentUser}
        />
        <br />
        <div className="row">
          <ListDocument
            currentUser={currentUser}
            userDocumentRequest={userDocumentRequest}
            documents={documents}
            userDeleteDocumentRequest={userDeleteDocumentRequest}
            userUpdateDocumentRequest={userUpdateDocumentRequest}
            loading={loading}
          />
        </div>
      </main>
    </div>
    <Modal
      header="Create Document"
      id="create-doc"
      trigger={
        <div className="fixed-action-btn">
          <a className="btn-floating btn-large pink darken-4" id="createbtn">
            <i className="large white-text material-icons">edit</i>
          </a>
        </div>
      }
    >
      <CreateDocument
        currentUser={currentUser}
        userSaveDocumentRequest={userSaveDocumentRequest}
      />
    </Modal>
  </div>
);

Dashboard.defaultProps = {
  documents: []
};

Dashboard.propTypes = {
  userSearchRequest: PropTypes.func.isRequired,
  userUpdateDocumentRequest: PropTypes.func.isRequired,
  documents: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  userSaveDocumentRequest: PropTypes.func.isRequired,
  userDocumentRequest: PropTypes.func.isRequired,
  userDeleteDocumentRequest: PropTypes.func.isRequired,
  loading: PropTypes.number.isRequired,
  currentUser: PropTypes.object.isRequired
};

/**
 * mapStateToProps
 *
 * @param {object} state
 * @returns
 */
function mapStateToProps(state) {
  return {
    loading: state.ajaxCallsInProgress,
    isAuthenticated: state.Auth.isAuthenticated,
    currentUser: state.Auth.user,
    documents: state.Document.documents
  };
}

export default connect(mapStateToProps, {
  userUpdateDocumentRequest,
  userSaveDocumentRequest,
  userDocumentRequest,
  userDeleteDocumentRequest,
  userSearchRequest
})(Dashboard);
