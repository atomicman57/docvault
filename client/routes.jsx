import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App.jsx';
import HomePage from './components/HomePage.jsx';
import SignupPage from './components/authentication/SignupPage.jsx';
import LoginPage from './components/authentication/LoginPage.jsx';
import Dashboard from './components/dashboard/Dashboard.jsx';
import myDocumentpage from './components/documents/MyDocumentpage.jsx';
import MyProfilePage from './components/users/MyProfilePage.jsx';


export default (
  <div>
    <Route path="/" component={App}>
      <IndexRoute component={HomePage} />
      <Route path="login" component={LoginPage} />
      <Route path="signup" component={SignupPage} />
      <Route path="dashboard" component={Dashboard} />
      <Route path="mydocuments" component={myDocumentpage} />
      <Route path="myprofile" component={MyProfilePage} />
    </Route>
  </div>
);
