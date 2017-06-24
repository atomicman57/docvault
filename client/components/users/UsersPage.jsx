import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import GetUsers from './GetUsers.jsx';
import SearchUsers from '../users/SearchUsers.jsx';
import {
  getUsersRequest,
  userSearchRequest,
  DeleteUserRequest
} from '../../actions/userActions';

class UsersPage extends React.Component {
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
      userSearchRequest,
      getUsersRequest,
      DeleteUserRequest,
      users
    } = this.props;
    return (
      <div>
        <div className="page">
          <main>
            <div className="breadcrumb grey lighten-3">
              <h6>
                Users
              </h6>
            </div>
            <br />
            <SearchUsers
              userSearchRequest={userSearchRequest}
              currentUser={currentUser}
            />
            <br />
            <div className="row">
              <GetUsers
                getUsersRequest={getUsersRequest}
                currentUser={currentUser}
                users={users}
                DeleteUserRequest={DeleteUserRequest}
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
      </div>
    );
  }
}

UsersPage.propTypes = {
  currentUser: PropTypes.object.isRequired,
  getUsersRequest: PropTypes.func.isRequired,
  userSearchRequest: PropTypes.func.isRequired,
  DeleteUserRequest: PropTypes.func.isRequired,
  // userPersonalDocumentRequest: PropTypes.func.isRequired,
  // documentType: PropTypes.string.isRequired,
  users: PropTypes.array.isRequired
};

function mapStateToProps(state) {
  return {
    currentUser: state.Auth.user,
    users: state.Users.users
  };
}

export default connect(mapStateToProps, {
  getUsersRequest,
  userSearchRequest,
  DeleteUserRequest
})(UsersPage);
