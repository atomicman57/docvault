import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MyProfile from '../users/MyProfile.jsx';
import { userUpdateUserRequest } from '../../actions/userActions';

const MyProfilePage = ({ currentUser, userUpdateUserRequest }) => (
  <div>
    <div className="page">
      <main>
        <div className="breadcrumb grey lighten-3">
          <h6>
            My Profile
          </h6>
        </div>
        <div className="row">
          <MyProfile
            currentUser={currentUser}
            userUpdateUserRequest={userUpdateUserRequest}
          />
        </div>
      </main>
    </div>
  </div>
);

MyProfilePage.propTypes = {
  currentUser: PropTypes.object.isRequired,
  userUpdateUserRequest: PropTypes.func.isRequired
};

/**
 * mapStateToProps
 *
 * @param {object} state
 * @returns
 */
function mapStateToProps(state) {
  return {
    currentUser: state.Auth.user
  };
}

export default connect(mapStateToProps, { userUpdateUserRequest })(
  MyProfilePage
);
