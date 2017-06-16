import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App.jsx';
import Login from './components/Login.jsx';
import HomePage from './components/HomePage.jsx';
import SignupPage from './components/SignupPage.jsx';

export default (
  <div>
    <Route path="/" component={App}>
      <IndexRoute component={HomePage} />
      <Route path="signup" component={SignupPage} />
    </Route>
  </div>
);
