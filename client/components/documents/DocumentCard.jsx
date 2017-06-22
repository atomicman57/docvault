import React, { PropTypes } from 'react';
import { Modal } from 'react-materialize';
import EditDocument from './EditDocument.jsx';

const DocumentCard = ({ document, currentUser, confirmDelete }) => (
  <div>
    <div className="col s12 m6 l3" key={document.id}>
      <div className="card">
        <div className="card-content black-text">
          <div key={document.id}>
            <h5 style={{ fontSize: '1.2em' }}>
              <i className="mdi-social-group-add" /> {document.title}
            </h5>
            <p className="card-stats-number">{document.access} </p>
            <p className="card-stats-compare">
              <span className="deep-orange-text text-lighten-2">
                {new Date(document.createdAt).toDateString()}
              </span>
            </p>
            <p className="card-stats-number" style={{ fontSize: '0.8em' }}>
              View More{' '}
            </p>
            {(currentUser.id === document.userId || currentUser.roleId === 2) &&
              <span style={{ padding: '20px' }}>
                <Modal
                  header="Edit Document"
                  trigger={
                    <a
                      className="btn-floating editbutton"
                      style={{ marginRight: '20px' }}
                    >
                      <i className="material-icons">edit</i>
                    </a>
                  }
                >
                  <EditDocument document={document} currentUser={currentUser} />
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

DocumentCard.propTypes = {
  document: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
  confirmDelete: PropTypes.func.isRequired
};

export default DocumentCard;
