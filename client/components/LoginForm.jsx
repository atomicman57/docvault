import React from 'react';
import PropTypes from 'prop-types';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errors: {},
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
      .userLoginRequest(this.state)
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
          <h4 className="header2">Login</h4>
          {errors.message}
          <div className="mysignuprow row">
            <form className="col s12" onSubmit={this.onSubmit}>
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

LoginForm.propTypes = {
  userLoginRequest: PropTypes.func.isRequired
};
LoginForm.contextTypes = {
  router: PropTypes.object.isRequired
};

export default LoginForm;
