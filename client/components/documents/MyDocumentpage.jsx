import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Modal } from 'react-materialize';
import CreateDocument from '../documents/CreateDocument.jsx';
import MyDocuments from '../documents/MyDocument.jsx';
import SearchDocument from '../documents/SearchDocument.jsx';
import {
  userSaveDocumentRequest,
  userDocumentRequest,
  userDeleteDocumentRequest,
  userUpdateDocumentRequest,
  userSearchRequest,
  userPersonalDocumentRequest
} from '../../actions/documentActions';

class MyDocumentPage extends React.Component {
  componentDidMount() {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      this.userId = this.props.currentUser.id;
      this.firstname = this.props.currentUser.firstname;
      this.lastname = this.props.currentUser.lastname;
      this.username = this.props.currentUser.username;
      this.email = this.props.currentUser.email;
    }
  }
  render() {
    const {
      currentUser,
      userSaveDocumentRequest,
      userDocumentRequest,
      userDeleteDocumentRequest,
      userSearchRequest,
      userUpdateDocumentRequest,
      userPersonalDocumentRequest,
      documents
    } = this.props;
    return (
      <div>
        <div className="page">
          <main>
            <div className="breadcrumb grey lighten-3">
              <h6>
                My Documents
              </h6>
            </div>
            <Modal
          header="Create Document"
          trigger={
            <div className="fixed-action-btn">
              <a className="btn-floating btn-large pink darken-4">
                <i className="large white-text material-icons">edit</i>
              </a>
            </div>
          }
        >
          <CreateDocument
            currentUser={currentUser}
            userSaveDocumentRequest={userSaveDocumentRequest}
            documentType={'personal'}
          />
        </Modal>
            <br />
            <SearchDocument
              userSearchRequest={userSearchRequest}
              currentUser={currentUser}
              documentType={'personal'}
            />
            <br />
            <div className="row">
              <MyDocuments
                currentUser={currentUser}
                userDocumentRequest={userDocumentRequest}
                documents={documents}
                userDeleteDocumentRequest={userDeleteDocumentRequest}
                userUpdateDocumentRequest={userUpdateDocumentRequest}
                userPersonalDocumentRequest={userPersonalDocumentRequest}
                documentType={'personal'}
              />
            </div>
          </main>
        </div>
      </div>
    );
  }
}

MyDocumentPage.propTypes = {
  currentUser: PropTypes.object.isRequired,
  userDocumentRequest: PropTypes.func.isRequired,
  userDeleteDocumentRequest: PropTypes.func.isRequired,
  userUpdateDocumentRequest: PropTypes.func.isRequired,
  userPersonalDocumentRequest: PropTypes.func.isRequired,
  documentType: PropTypes.string.isRequired,
  documents: PropTypes.array.isRequired
};

function mapStateToProps(state) {
  return {
    currentUser: state.Auth.user,
    documents: state.Document.documents
  };
}

export default connect(mapStateToProps, {
  userPersonalDocumentRequest,
  userSaveDocumentRequest,
  userDocumentRequest,
  userDeleteDocumentRequest,
  userUpdateDocumentRequest,
  userSearchRequest
})(MyDocumentPage);
