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
    const { currentUser } = this.props;
    console.log(currentUser);
    let admin;
    if (currentUser.roleId == 2) {
      admin = (
        <div>
          <li>
            <a className="waves-effect waves-grey">
              <i className="material-icons">perm_identity</i>
              <span className="badge deep-orange darken-1 white-text">
                33
              </span>
              {' '}
              Users
            </a>
          </li>
          <li>
            <a className="waves-effect waves-grey">
              <i className="material-icons">clear_all</i>
              Roles
            </a>
          </li>
        </div>
      );
    }
    const userLinks = (
      <div>
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
              {/* <li>
              <a href="#">
                <span className="nav-badge">3</span>
                <i className="material-icons">chat_bubble</i>
              </a>
            </li>*/}
              <li>
                <a >
                  <i className="material-icons">settings</i>
                </a>
              </li>
              <li>
                <a onClick={this.logout.bind(this)}>
                  <i className="material-icons">exit_to_app</i>
                </a>
              </li>
            </ul>
          </div>
          <div />
        </nav>
        <header>
          <div>
            <ul
              id="nav-mobile"
              className="side-nav custom-side-nav fixed"
              style={{ width: '240px' }}
            >
              <li className="grey darken-4">
                <div className="user">
                  <div className="chip grey darken-3 white-text">
                    <img
                      src="http://s3.amazonaws.com/nvest/Blank_Club_Website_Avatar_Gray.jpg"
                      alt="Contact Person"
                    />
                    {currentUser.firstname} {currentUser.lastname}
                  </div>
                </div>
              </li>
              <li>
                <Link to="/dashboard" className="waves-effect waves-grey">
                  <i className="material-icons deep-orange-text">airplay</i>
                  <span>Dashboard</span>
                </Link>
              </li>
              {admin}
              <li>
                <Link to="/mydocuments" className="waves-effect waves-grey">
                  <i className="material-icons">storage</i>
                  My Documents
                </Link>
              </li>
              <li>
                <Link to="/myprofile" className="waves-effect waves-grey">
                  <i className="material-icons">settings</i>
                  My Profile
                </Link>
              </li>
              {/* <li>
                  <a className="waves-effect waves-grey">
                    <i className="material-icons">layers</i>
                    Servers
                  </a>
                </li>*/}

              {/* <li>
                  <a className="waves-effect waves-grey">
                    <i className="material-icons">public</i>
                    Domains
                  </a>
                </li>
                <li>
                  <a className="waves-effect waves-grey">
                    <i className="material-icons">cloud_queue</i>
                    Network
                  </a>
                </li>

                <li>
                  <a className="waves-effect waves-grey">
                    <i className="material-icons">notifications_none</i>
                    Alerts
                  </a>
                </li>*/}
              <li>
                <a
                  onClick={this.logout.bind(this)}
                  className="waves-effect waves-grey"
                >
                  <i className="material-icons">exit_to_app</i>
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </header>
      </div>
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
  currentUser: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
};

NavBar.contextTypes = {
  router: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    auth: state.Auth,
    currentUser: state.Auth.user
  };
}
export default connect(mapStateToProps, { logout })(NavBar);
