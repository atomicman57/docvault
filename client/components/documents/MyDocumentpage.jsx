import React from 'react';
import PropTypes from 'prop-types';
// import Spinner from 'react-spinner-material';
import { connect } from 'react-redux';
import CreateDocument from '../documents/CreateDocument.jsx';
import MyDocuments from '../documents/MyDocument.jsx';
import { Modal } from 'react-materialize';
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
  constructor(props, context) {
    super(props, context);
  }

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
                My Dashboard
              </h6>
            </div>
            <br />
            <SearchDocument userSearchRequest={userSearchRequest} currentUser={currentUser} documentType={'personal'} />
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

          <main>
            <div id="shell" className="shell">
              <div className="shell-header">
                <a href="#" className="deep-orange black-text">
                  <i className="material-icons">clear</i>
                </a>
                <a className="grey darken-2 black-text" href="#">
                  <i className="material-icons">remove</i>
                </a>
                <a className="grey darken-2 black-text" href="#">
                  <i className="material-icons">crop_square</i>
                </a>
              </div>
              <div className="shell-content">
                <h6 className="red-text text-accent-3">
                  DOC VAULT SHELL v1.0.2
                </h6>
                <div className="grey-text">
                  Powered by
                  Doc Vault Server
                </div>
                <div className="white-text text-lighten-3">
                  Welcome back {this.username}!
                </div>
                <div className="deep-orange-text text-accent-1">
                  host01:{this.username} root$
                </div>
                <div className="deep-orange-text text-accent-1">
                  host01:{this.username} root$ sudo
                </div>
                <div className="deep-orange-text text-accent-1">
                  Your password:
                </div>
                <div className="deep-orange-text text-accent-1">
                  host01:{this.username} root$

                  <span className="deep-orange-text text-lighten-4">
                    ls -la
                  </span>
                </div>
                <div className="deep-orange-text text-accent-1">
                  host01:{this.username} root$
                  <span className="deep-orange-text text-lighten-4">
                    usr/ bin/ etc/ var/ .git .gitignore
                  </span>
                </div>
                <div className="deep-orange-text text-accent-1">
                  host01:{this.username} root$
                  <span className="deep-orange-text text-lighten-4">
                    git clone git@github.com:720kb/hubuntu-ui.git hubuntu-ui
                  </span>
                </div>
                <div className="deep-orange-text text-accent-1">
                  host01:{this.username} root$
                  <span className="deep-orange-text text-lighten-4">
                    cd hubuntu-ui/
                  </span>
                </div>
                <div className="deep-orange-text text-accent-1">
                  host01:{this.username} root$

                  <span className="deep-orange-text text-lighten-4">
                    bower install
                  </span>
                </div>
                <div className="deep-orange-text text-accent-1">
                  host01:{this.username} root$

                  <span className="deep-orange-text text-lighten-4">
                    python -m SimpleHTTPServer
                  </span>
                  <span className="blink white-text">|</span>
                </div>
              </div>
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
            documentType={'personal'}
          />
        </Modal>
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
