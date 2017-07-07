import React from 'react';
import PropTypes from 'prop-types';
import jwt from 'jsonwebtoken';
import { connect } from 'react-redux';
import { logout } from '../actions/authActions';

/**
 *
 *
 * @export
 * @param {any} ComposedComponent
 * @returns {any}
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
        jwt.verify(token, 'secretTokenKey', (error) => {
          if (error) {
            this.props.logout();
            this.context.router.push('/login');
          }
        });
      }

      if (!this.props.isAuthenticated) {
        this.context.router.push('/login');
      }

      if (this.props.isAuthenticated && this.props.roleId !== 2) {
        this.context.router.push('/dashboard');
      }
    }

    /**
     *
     *
     * @param {any} nextProps
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
 * @param {any} state
 * @returns {boolean}
 */
  function mapStateToProps(state) {
    let isAuthenticated;
    if (state.Auth.isAuthenticated) {
      isAuthenticated = state.Auth.isAuthenticated;
    } else {
      isAuthenticated = false;
    }
    return {
      isAuthenticated,
      roleId: state.Auth.user.roleId
    };
  }

  return connect(mapStateToProps, { logout })(Authenticate);
}
