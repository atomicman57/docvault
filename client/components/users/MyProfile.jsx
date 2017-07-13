import React from 'react';
import PropTypes from 'prop-types';

/**
 *
 *
 * @class EditProfileForm
 * @extends {React.Component}
 */
class EditProfileForm extends React.Component {
  /**
   * Creates an instance of EditProfileForm.
   * @param {any} props
   * @memberof EditProfileForm
   */
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.currentUser.id,
      firstname: this.props.currentUser.firstname,
      lastname: this.props.currentUser.lastname,
      username: this.props.currentUser.username,
      email: this.props.currentUser.email,
      password: '',
      confirm_password: '',
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onSubmitPassword = this.onSubmitPassword.bind(this);
  }

  /**
   *
   *
   * @param {any} e
   * @memberof EditProfileForm
   */
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    this.setState({ errors: {} });
  }

  /**
   *
   *
   * @param {any} event
   * @memberof EditProfileForm
   */
  onSubmit(event) {
    event.preventDefault();
    const userData = {
      id: this.state.id,
      firstname: this.state.firstname,
      lastname: this.state.lastname
    };
    this.props.userUpdateUserRequest(userData).then(() => {
      Materialize.toast('User Details Updated Successfully', 2000);
    });
  }
  /**
   *
   *
   * @param {any} event
   * @memberof EditProfileForm
   */
  onSubmitPassword(event) {
    event.preventDefault();
    if (this.state.password !== this.state.confirm_password) {
      Materialize.toast('Password do not match', 2000);
    } else {
      const userData = {
        id: this.state.id,
        password: this.state.password
      };
      this.props.userUpdateUserRequest(userData).then(() => {
        Materialize.toast('Password Changed Successfully', 2000);
      });
    }
  }

  /**
   *
   *
   * @returns
   * @memberof EditProfileForm
   */
  render() {
    return (
      <div>
        <div className="card-panel">
          <h4 className="header2">Edit Profile</h4>
          <div className="mysignuprow row">
            <form className="col s12 form1" onSubmit={this.onSubmit}>
              <div className="mysignuprow row">
                <div className="input-field col s12">
                  <i className="material-icons prefix">account_circle</i>
                  <input
                    id="icon_prefix"
                    type="text"
                    name="firstname"
                    value={this.state.firstname}
                    placeholder="First Name"
                    onChange={this.onChange}
                    className="validate firstname"
                    required
                  />
                </div>
              </div>
              <div className="mysignuprow row">
                <div className="input-field col s12">
                  <i className="material-icons prefix">account_circle</i>
                  <input
                    id="icon_prefix"
                    type="text"
                    name="lastname"
                    placeholder="Last Name"
                    value={this.state.lastname}
                    onChange={this.onChange}
                    className="validate"
                    required
                  />
                </div>
              </div>
              <div className="mysignuprow row">
                <div className="input-field col s12">
                  <i className="material-icons prefix">account_circle</i>
                  <input
                    id="icon_prefix"
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={this.state.username}
                    onChange={this.onChange}
                    className="validate"
                    disabled="disabled"
                  />
                </div>
              </div>
              <div className="mysignuprow row">
                <div className="input-field col s12">
                  <i className="material-icons prefix">email</i>
                  <input
                    id="icon_prefix"
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={this.state.email}
                    onChange={this.onChange}
                    className="validate"
                    disabled="disabled"
                    required
                  />
                </div>
              </div>
              <div className="mysignuprow row">
                <div className="input-field col s12">
                  <button
                    className="mybutton btn waves-effect waves-light right"
                    type="submit"
                    name="submit"
                  >
                    Update Profile
                  </button>
                </div>
              </div>
            </form>
          </div>
          <h4 className="header2">Change Password</h4>
          <div className="mysignuprow row">
            <form className="col s12 form2" onSubmit={this.onSubmitPassword}>
              <div className="mysignuprow row" />
              <div className="mysignuprow row">
                <div className="input-field col s12">
                  <i className="material-icons prefix">lock_outline</i>
                  <input
                    id="icon_prefix"
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="validate"
                    value={this.state.password}
                    onChange={this.onChange}
                    required
                  />
                </div>
              </div>
              <div className="mysignuprow row">
                <div className="input-field col s12">
                  <i className="material-icons prefix">lock_outline</i>
                  <input
                    id="icon_prefix"
                    type="password"
                    name="confirm_password"
                    placeholder="Confirm Password"
                    className="validate"
                    value={this.state.confirm_password}
                    onChange={this.onChange}
                    required
                  />
                </div>
              </div>
              <div className="mysignuprow row">
                <div className="input-field col s12">
                  <button
                    className="mybutton btn waves-effect waves-light right"
                    type="submit"
                    name="submit"
                  >
                    Change Password
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

EditProfileForm.propTypes = {
  currentUser: PropTypes.object.isRequired,
  userUpdateUserRequest: PropTypes.func.isRequired
};

EditProfileForm.contextTypes = {
  router: PropTypes.object.isRequired
};

export default EditProfileForm;
