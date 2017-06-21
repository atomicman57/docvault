import React from 'react';
import PropTypes from 'prop-types';

class EditProfileForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: this.props.currentUser.firstname,
      lastname: this.props.currentUser.lastname,
      username: this.props.currentUser.username,
      email: this.props.currentUser.email,
      password: '',
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    this.setState({ errors: {} });
  }
  onSubmit(event) {
    event.preventDefault();
    this.props
      .userSignupRequest(this.state)
      .then(
        () => {
          this.context.router.push('/dashboard');
        }
      )
      
  }
  render() {
    const { errors } = this.state;
    return (
      <div>
        <div className="card-panel">
          <h4 className="header2">Edit Profile</h4>
          {/*{errors.message}*/}
          <div className="mysignuprow row">
            <form className="col s12" onSubmit={this.onSubmit}>
              <div className="mysignuprow row">
                <div className="input-field col s12">
                  <i className="material-icons prefix">account_circle</i>
                  <input
                    id="icon_prefix"
                    type="text"
                    name="firstname"
                    value={this.state.firstname}
                    onChange={this.onChange}
                    className="validate"
                  />
                  <label htmlFor="first_name">First Name</label>
                </div>
              </div>
              <div className="mysignuprow row">
                <div className="input-field col s12">
                  <i className="material-icons prefix">account_circle</i>
                  <input
                    id="icon_prefix"
                    type="text"
                    name="lastname"
                    value={this.state.lastname}
                    onChange={this.onChange}
                    className="validate"
                  />
                  <label htmlFor="last_name">Last Name</label>
                </div>
              </div>
              <div className="mysignuprow row">
                <div className="input-field col s12">
                  <i className="material-icons prefix">account_circle</i>
                  <input
                    id="icon_prefix"
                    type="text"
                    name="username"
                    value={this.state.username}
                    onChange={this.onChange}
                    className="validate"
                  />
                  <label htmlFor="user_name">Username</label>
                </div>
              </div>
              <div className="mysignuprow row">
                <div className="input-field col s12">
                  <i className="material-icons prefix">email</i>
                  <input
                    id="icon_prefix"
                    type="email"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChange}
                    className="validate"
                  />
                  <label htmlFor="email">Email</label>
                </div>
              </div>
              <div className="mysignuprow row">
                <div className="input-field col s12">
                  <i className="material-icons prefix">lock_outline</i>
                  <input
                    id="icon_prefix"
                    type="password"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                  <label htmlFor="password">Password</label>
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
        </div>
      </div>
    );
  }
}

EditProfileForm.propTypes = {
  currentUser: PropTypes.object.isRequired,
};

// EditProfileForm.propTypes = {
//   userSignupRequest: PropTypes.func.isRequired
// };
EditProfileForm.contextTypes = {
  router: PropTypes.object.isRequired
};

export default EditProfileForm;
