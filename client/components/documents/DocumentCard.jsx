import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-materialize';
import renderHTML from 'react-render-html';
import EditDocument from './EditDocument.jsx';
import ViewDocument from './ViewDocument.jsx';

const DocumentCard = ({
  document,
  currentUser,
  confirmDelete,
  userUpdateDocumentRequest,
  documentType
}) => (
  <div>
    <div className="col s12 m6 l3" key={document.id}>
      <div className="card">
        <div className="card-content black-text">
          <div key={document.id}>
            <div className="title">
              {document.title}
            </div>
            <hr />
            <div className="document-content">
              {renderHTML(document.content)}
            </div>
            <hr />
            <p className="card-stats-number">Access: {document.access} </p>
            <p className="card-stats-compare">
              <span className="deep-orange-text text-lighten-2">
                Date: {new Date(document.createdAt).toDateString()}
              </span>
            </p>
            <p className="card-stats-number">
              Created by: {document.User.username}
            </p>
            <p className="card-stats-number" style={{ fontSize: '0.8em' }}>
              <Modal trigger={<a href="" id="view_more">View More</a>}>
                <ViewDocument document={document} />
              </Modal>
            </p>
            {(currentUser.id === document.userId || currentUser.roleId === 2) &&
              <span style={{ padding: '20px' }}>
                <Modal
                  header="Edit Document"
                  id="edit-doc"
                  trigger={
                    <a
                      className="btn-floating editbutton"
                      style={{ marginRight: '20px' }}
                    >
                      <i className="material-icons">edit</i>
                    </a>
                  }
                >
                  <EditDocument
                    document={document}
                    currentUser={currentUser}
                    userUpdateDocumentRequest={userUpdateDocumentRequest}
                    documentType={documentType}
                  />
                </Modal>
                <a
                  onClick={() => confirmDelete(document.id)}
                  className="btn-floating deletebutton"
                >
                  <i className="material-icons">delete</i>
                </a>
              </span>}
          </div>
        </div>
      </div>
    </div>
  </div>
);

DocumentCard.defaultProps = {
  documentType: null,
};

DocumentCard.propTypes = {
  document: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
  confirmDelete: PropTypes.func.isRequired,
  documentType: PropTypes.string,
};

export default DocumentCard;
