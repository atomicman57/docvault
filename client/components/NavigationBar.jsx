import React from 'react';
import { Link } from 'react-router';
const NavBar = () => {
  return (
    <nav className="main-panel" role="navigation">
      <div className="nav-wrapper container">
        <span id="logo-container" to="#" className="brand-logo">Doc Vault</span>
        <ul className="right hide-on-med-and-down">
          <li><Link to="/signin">Login</Link></li>
          <li><Link to="/signup">Sign Up</Link></li>
        </ul>

        <ul id="nav-mobile" className="side-nav">
          <li><a to="#">Navbar Link</a></li>
        </ul>
        <Link to="#" data-activates="nav-mobile" className="button-collapse">
          <i className="material-icons">menu</i>
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
