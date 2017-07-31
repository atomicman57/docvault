import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-materialize';
import CreateDocument from '../documents/CreateDocument.jsx';
import SearchDocument from '../documents/SearchDocument.jsx';
import ListDocument from '../documents/ListDocument.jsx';

const GetDocument = ({
  userDocumentRequest,
  userSaveDocumentRequest,
  userDeleteDocumentRequest,
  userSearchRequest,
  userUpdateDocumentRequest,
  documents,
  headingTitle,
  documentType,
  currentUser,
  loading
}) => (
  <div>
    <div className="page">
      <main>
        <div className="breadcrumb grey lighten-3">
          <h6>{headingTitle}</h6>
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
            documentType={documentType}
            currentUser={currentUser}
            userSaveDocumentRequest={userSaveDocumentRequest}
          />
        </Modal>
        <br />
        <SearchDocument
          documentType={documentType}
          currentUser={currentUser}
          userSearchRequest={userSearchRequest}
        />
        <br />
        <div className="row">
          <ListDocument
            documentType={documentType}
            loading={loading}
            userDeleteDocumentRequest={userDeleteDocumentRequest}
            userUpdateDocumentRequest={userUpdateDocumentRequest}
            currentUser={currentUser}
            userDocumentRequest={userDocumentRequest}
            documents={documents}
          />
        </div>
      </main>
    </div>
  </div>
);

GetDocument.defaultProps = {
  documents: {},
  documentType: null
};

GetDocument.propTypes = {
  currentUser: PropTypes.object.isRequired,
  userDeleteDocumentRequest: PropTypes.func.isRequired,
  userUpdateDocumentRequest: PropTypes.func.isRequired,
  documentType: PropTypes.string,
  userDocumentRequest: PropTypes.func.isRequired,
  documents: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  loading: PropTypes.number.isRequired
};
export default GetDocument;
