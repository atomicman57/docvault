import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

/**
 *
 *
 * @class LoginForm
 * @extends {React.Component}
 */
class LoginForm extends React.Component {
  /**
   * Creates an instance of LoginForm.
   * @param {any} props
   * @memberof LoginForm
   */
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
   *
   *
   * @param {any} event
   * @memberof LoginForm
   */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
   *
   *
   * @param {any} event
   * @memberof LoginForm
   */
  onSubmit(event) {
    event.preventDefault();
    this.props
      .userLoginRequest(this.state)
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

  /**
   *
   *
   * @returns
   * @memberof LoginForm
   */
  render() {
    const { errors } = this.state;
    return (
      <div>
        <div
          className="card-panel"
          style={{ marginTop: '60px', marginBottom: '170px' }}
        >
          <h5 className="header2">Login</h5>
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
                    className="validate email"
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
          <br />
          <h6> Dont have an Account? <Link to="/signup">Sign Up</Link> </h6>
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
