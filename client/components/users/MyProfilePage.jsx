import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Modal } from 'react-materialize';
import CreateDocument from '../documents/CreateDocument.jsx';
import MyProfile from '../users/MyProfile.jsx';
import * as AuthActions from '../../actions/authActions';

class MyProfilePage extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

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
    const { currentUser } = this.props;
    return (
      <div>
        <div className="page">
          <main>
            <div className="breadcrumb grey lighten-3">
              <h6>
                My Profile
              </h6>
            </div>
            <div className="row">
              <MyProfile currentUser={currentUser} />

            </div>
      
          </main>
        </div>
      </div>
    );
  }
}

MyProfilePage.propTypes = {
  currentUser: PropTypes.object.isRequired
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign({}, AuthActions), dispatch)
  };
}

function mapStateToProps(state) {
  return {
    currentUser: state.Auth.user
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MyProfilePage);
