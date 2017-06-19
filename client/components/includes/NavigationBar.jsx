import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import { logout } from '../../actions/authActions';

class NavBar extends React.Component {
  logout(e) {
    e.preventDefault();
    this.props.logout();
    this.context.router.push('/');
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    const userLinks = (
      <nav className="pink darken-4">
        <div className="nav-wrapper">
          <a
            href="#"
            data-activates="nav-mobile"
            className="button-collapse top-nav full hide-on-large-only"
          >
            <i className="material-icons">menu</i>
          </a>
          <span href="#" className="brand-logo page-title">
            Doc Vault
          </span>
          <ul className="right hide-on-med-and-down">
            <li>
              <a href="#">
                <span className="nav-badge">3</span>
                <i className="material-icons">chat_bubble</i>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="material-icons">settings</i>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="tooltipped"
                data-position="left"
                data-delay="10"
                data-tooltip="Logout"
                onClick={this.logout.bind(this)}
              >
                <i className="material-icons">exit_to_app</i>
              </a>
            </li>
          </ul>
        </div>
        <div />
      </nav>
    );

    const guestLinks = (
      <nav className="main-panel" role="navigation">
        <div className="nav-wrapper container">
          <Link id="logo-container" to="/" className="brand-logo">
            Doc Vault
          </Link>
          <ul className="right hide-on-med-and-down">
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Sign Up</Link></li>
          </ul>

          <ul id="nav-mobile" className="side-nav">
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Sign Up</Link></li>
          </ul>
          <Link to="#" data-activates="nav-mobile" className="button-collapse">
            <i className="material-icons">menu</i>
          </Link>
        </div>
      </nav>
    );
    return (
      <div>
        {isAuthenticated ? userLinks : guestLinks}
      </div>
    );
  }
}

NavBar.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
};

NavBar.contextTypes = {
  router: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    auth: state.Auth
  };
}
export default connect(mapStateToProps, { logout })(NavBar);
