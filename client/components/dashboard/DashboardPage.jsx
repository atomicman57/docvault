import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Modal } from 'react-materialize';

import CreateDocument from '../documents/CreateDocument.jsx';
import GetDocument from '../documents/GetDocument.jsx';
import SearchDocument from '../documents/SearchDocument.jsx';
import {
  userSaveDocumentRequest,
  userDocumentRequest,
  userDeleteDocumentRequest,
  userUpdateDocumentRequest,
  userSearchRequest
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
          <GetDocument
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
  currentUser: PropTypes.object.isRequired,
  userSaveDocumentRequest: PropTypes.func.isRequired,
  userDocumentRequest: PropTypes.func.isRequired,
  userDeleteDocumentRequest: PropTypes.func.isRequired,
  userSearchRequest: PropTypes.func.isRequired,
  userUpdateDocumentRequest: PropTypes.func.isRequired,
  documents: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  loading: PropTypes.number.isRequired
};

/**
 * mapStateToProps
 *
 * @param {object} state
 * @returns
 */
function mapStateToProps(state) {
  return {
    currentUser: state.Auth.user,
    documents: state.Document.documents,
    loading: state.ajaxCallsInProgress,
    isAuthenticated: state.Auth.isAuthenticated
  };
}

export default connect(mapStateToProps, {
  userSaveDocumentRequest,
  userDocumentRequest,
  userDeleteDocumentRequest,
  userUpdateDocumentRequest,
  userSearchRequest
})(Dashboard);
