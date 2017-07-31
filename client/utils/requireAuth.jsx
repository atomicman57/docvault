import React from 'react';
import PropTypes from 'prop-types';
import jwt from 'jsonwebtoken';
import { connect } from 'react-redux';
import { logout } from '../actions/authActions';

/**
 *
 *
 * @export
 * @param {component} ComposedComponent
 */
export default function (ComposedComponent) {
  /**
   *
   *
   * @class Authenticate
   * @extends {React.Component}
   */
  class Authenticate extends React.Component {
    /**
     *
     *
     * @memberof Authenticate
     */
    componentWillMount() {
      const token = localStorage.getItem('jwtToken');
      if (token) {
        jwt.verify(token, process.env.JWTSECRET, (error) => {
          if (error) {
            this.props.logout();
            this.context.router.push('/login');
          }
        });
      } else if (!this.props.isAuthenticated) {
        this.context.router.push('/login');
      }
    }

    /**
     *
     *
     * @param {object} nextProps
     * @memberof Authenticate
     */
    componentWillUpdate(nextProps) {
      if (!nextProps.isAuthenticated) {
        this.context.router.push('/login');
      }
    }

    /**
     *
     *
     * @returns
     * @memberof Authenticate
     */
    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  Authenticate.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired
  };

  Authenticate.contextTypes = {
    router: PropTypes.object.isRequired
  };

  /**
 *
 *
 * @param {object} state
 * @returns {boolean}
 */
  function mapStateToProps(state) {
    let isAuthenticated;
    if (state.Auth.isAuthenticated) {
      isAuthenticated = state.Auth.isAuthenticated;
    } else {
      isAuthenticated = false;
    }
    return { isAuthenticated };
  }

  return connect(mapStateToProps, { logout })(Authenticate);
}
