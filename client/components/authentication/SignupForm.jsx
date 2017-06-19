import React from 'react';
import PropTypes from 'prop-types';

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      username: '',
      email: '',
      password: '',
      confirm_password: '',
      errors: {},
      message: {},
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
      .catch((error) => {
        this.setState({ errors: error.response.data });
        const { errors } = this.state;
        const $toastContent = (`<span>${errors.message}</span>`);
        Materialize.toast($toastContent, 5000);
      });
  }
  render() {
    const { errors } = this.state;
    return (
      <div>
        <div className="card-panel">
          <h4 className="header2">Sign Up</h4>
          {errors.message}
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
                    required
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
                    required
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
