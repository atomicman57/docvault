import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SignupForm from './SignupForm.jsx';
import { userSignupRequest } from '../../actions/authActions';

const SignupPage = ({ userSignupRequest }) => (
  <div>
    <div className="mysignup">
      <div className="col s12 m12 l6">
        <SignupForm userSignupRequest={userSignupRequest} />
      </div>
    </div>
  </div>
);

SignupPage.propTypes = {
  userSignupRequest: PropTypes.func.isRequired
};

export default connect(null, { userSignupRequest })(SignupPage);
