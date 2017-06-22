import React from 'react';
import PropTypes from 'prop-types';
// import Spinner from 'react-spinner-material';
import { connect } from 'react-redux';
import CreateDocument from '../documents/CreateDocument.jsx';
import MyDocuments from '../documents/MyDocument.jsx';
import { Modal } from 'react-materialize';
import { userPersonalDocumentRequest } from '../../actions/documentActions';

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
    const { currentUser, userPersonalDocumentRequest, documents } = this.props;
    return (
      <div>
        <div className="page">
          <main>
            <div className="breadcrumb grey lighten-3">
              <h6>
                My Documents
              </h6>
            </div>
            <div className="row">
              <MyDocuments
                currentUser={currentUser}
                userPersonalDocumentRequest={userPersonalDocumentRequest}
                documents={documents}
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
          {/* <CreateDocument currentUser={currentUser} />*/}
        </Modal>
      </div>
    );
  }
}

MyDocumentPage.propTypes = {
  currentUser: PropTypes.object.isRequired,
  userPersonalDocumentRequest: PropTypes.func.isRequired,
  documents: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    currentUser: state.Auth.user,
    documents: state.Document
  };
}

export default connect(mapStateToProps, { userPersonalDocumentRequest })(
  MyDocumentPage
);
