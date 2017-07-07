import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

/**
 *
 *
 * @class SignupForm
 * @extends {React.Component}
 */
class SignupForm extends React.Component {

  /**
   * Creates an instance of SignupForm.
   * @param {any} props
   * @memberof SignupForm
   */
  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      username: '',
      email: '',
      password: '',
      confirm_password: '',
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
   *
   *
   * @param {any} event
   * @memberof SignupForm
   */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
   *
   *
   * @param {any} event
   * @memberof SignupForm
   */
  onSubmit(event) {
    event.preventDefault();
    if (this.state.password !== this.state.confirm_password) {
      Materialize.toast('Password do not match', 2000);
    } else {
      this.props
        .userSignupRequest(this.state)
        .then(() => {
          this.context.router.push('/dashboard');
        })
        .catch((error) => {
          this.setState({ errors: error.response.data });
          const { errors } = this.state;
          const $toastContent = `<span>${errors.message}</span>`;
          Materialize.toast($toastContent, 5000);
        });
    }
  }

  /**
   *
   *
   * @returns
   * @memberof SignupForm
   */
  render() {
    const { errors } = this.state;
    return (
      <div>
        <div className="card-panel">
          <h5 className="header2">Sign Up</h5>
          {errors.message}
          <div className="mysignuprow row">
            <form className="col s12" onSubmit={this.onSubmit}>
              <div className="input-field col s6">
                <i className="material-icons prefix">account_circle</i>
                <input
                  id="icon_prefix"
                  type="text"
                  name="firstname"
                  value={this.state.firstname}
                  onChange={this.onChange}
                  className="validate firstname"
                  required
                />
                <label htmlFor="first_name">First Name</label>
              </div>
              <div className="input-field col s6">
                <i className="material-icons prefix">account_circle</i>
                <input
                  id="icon_prefix"
                  type="text"
                  name="lastname"
                  value={this.state.lastname}
                  onChange={this.onChange}
                  className="validate"
                  required
                />
                <label htmlFor="last_name">Last Name</label>
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
                    required
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
                    required
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
                    className="validate"
                    required
                  />
                  <label htmlFor="password">Password</label>
                </div>
              </div>
              <div className="mysignuprow row">
                <div className="input-field col s12">
                  <i className="material-icons prefix">lock_outline</i>
                  <input
                    id="icon_prefix"
                    type="password"
                    name="confirm_password"
                    value={this.state.confirm_password}
                    onChange={this.onChange}
                    className="validate"
                    required
                  />
                  <label htmlFor="password">Confirm Password</label>
                </div>
              </div>
              <div className="mysignuprow row">
                <div className="input-field col s12">
                  <button
                    className="mybutton btn waves-effect waves-light right"
                    type="submit"
                    name="submit"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
          <h6> Have an Account? <Link to="/login">Login</Link> </h6>
        </div>
      </div>
    );
  }
}

SignupForm.propTypes = {
  userSignupRequest: PropTypes.func.isRequired
};
SignupForm.contextTypes = {
  router: PropTypes.object.isRequired
};

export default SignupForm;
