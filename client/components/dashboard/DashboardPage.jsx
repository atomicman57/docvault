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
class Dashboard extends React.Component {

  /**
   * 
   * 
   * @memberof Dashboard
   */
  componentWillMount() {
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
      documents
    } = this.props;
    return (
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
              />
            </div>
          </main>
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
          />
        </Modal>
      </div>
    );
  }
}

Dashboard.propTypes = {
  currentUser: PropTypes.object.isRequired,
  userSaveDocumentRequest: PropTypes.func.isRequired,
  userDocumentRequest: PropTypes.func.isRequired,
  userDeleteDocumentRequest: PropTypes.func.isRequired,
  userSearchRequest: PropTypes.func.isRequired,
  userUpdateDocumentRequest: PropTypes.func.isRequired,
  documents: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    currentUser: state.Auth.user,
    documents: state.Document.documents
  };
}

export default connect(mapStateToProps, {
  userSaveDocumentRequest,
  userDocumentRequest,
  userDeleteDocumentRequest,
  userUpdateDocumentRequest,
  userSearchRequest
})(Dashboard);
