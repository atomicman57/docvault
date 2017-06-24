import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App.jsx';
import HomePage from './components/HomePage.jsx';
import SignupPage from './components/authentication/SignupPage.jsx';
import LoginPage from './components/authentication/LoginPage.jsx';
import DashboardPage from './components/dashboard/DashboardPage.jsx';
import myDocumentpage from './components/documents/MyDocumentpage.jsx';
import MyProfilePage from './components/users/MyProfilePage.jsx';
import UsersPage from './components/users/UsersPage.jsx';


export default (
  <div>
    <Route path="/" component={App}>
      <IndexRoute component={HomePage} />
      <Route path="login" component={LoginPage} />
      <Route path="signup" component={SignupPage} />
      <Route path="dashboard" component={DashboardPage} />
      <Route path="mydocuments" component={myDocumentpage} />
      <Route path="myprofile" component={MyProfilePage} />
      <Route path="userslist" component={UsersPage} />
    </Route>
  </div>
);
