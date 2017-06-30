import React from 'react';
import ReactDOM from 'react-dom';
import jwt from 'jsonwebtoken';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import routes from './routes.jsx';
import setAuthorizationToken from './utils/setAuthorizationToken';
import './assets/sass/dashboard.scss';
import './assets/sass/style.scss';
import { setCurrentUser } from './actions/authActions';
import ConfigureStore from './store/ConfigureStore';

const app = document.getElementById('app');

const store = ConfigureStore();

if (localStorage.jwtToken) {
  setAuthorizationToken(localStorage.jwtToken);
  store.dispatch(setCurrentUser(jwt.decode(localStorage.jwtToken)));
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  app
);
