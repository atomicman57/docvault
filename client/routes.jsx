import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App.jsx';
import HomePage from './components/HomePage.jsx';
import SignupPage from './components/SignupPage.jsx';
import LoginPage from './components/LoginPage.jsx';
import Dashboard from './components/Dashboard.jsx';

export default (
  <div>
    <Route path="/" component={App}>
      <IndexRoute component={HomePage} />
      <Route path="login" component={LoginPage} />
      <Route path="signup" component={SignupPage} />
      <Route path="dashboard" component={Dashboard} />
    </Route>
  </div>
);
