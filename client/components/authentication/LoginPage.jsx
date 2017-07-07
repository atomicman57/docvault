import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LoginForm from './LoginForm.jsx';
import { userLoginRequest } from '../../actions/authActions';

const LoginPage = ({ userLoginRequest }) => (
  <div>
    <div className="mysignup">
      <div className="col s12 m12 l6">
        <LoginForm userLoginRequest={userLoginRequest} />
      </div>
    </div>
  </div>
);

LoginPage.propTypes = {
  userLoginRequest: PropTypes.func.isRequired
};

export default connect(null, { userLoginRequest })(LoginPage);
