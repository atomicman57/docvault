import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LoginForm from './LoginForm.jsx';
import NavigationBar from '../includes/NavigationBar.jsx';
import { userLoginRequest } from '../../actions/authActions';

class LoginPage extends React.Component {
  render() {
    const { userLoginRequest } = this.props;
    return (
      <div>
        {/*<NavigationBar />*/}
        <div className="mysignup">
          <div className="col s12 m12 l6">
            <LoginForm userLoginRequest={userLoginRequest} />
          </div>
        </div>
      </div>
    );
  }
}

LoginPage.propTypes = {
  userLoginRequest: PropTypes.func.isRequired
};

export default connect(null, { userLoginRequest })(LoginPage);
