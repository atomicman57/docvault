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

const UsersPage = ({
  currentUser,
  userSearchRequest,
  getUsersRequest,
  DeleteUserRequest,
  users
}) => (
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
    </div>
  </div>
);

UsersPage.propTypes = {
  currentUser: PropTypes.object.isRequired,
  getUsersRequest: PropTypes.func.isRequired,
  userSearchRequest: PropTypes.func.isRequired,
  DeleteUserRequest: PropTypes.func.isRequired,
  users: PropTypes.array.isRequired
};

/**
 *
 *
 * @param {any} state
 * @returns
 */
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
