import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import NavigationBar from './includes/NavigationBar.jsx';
import Footer from './includes/Footer.jsx';
import Spinner from './includes/Spinner.jsx';

const App = ({ children, loading }) => (
  <div>
    <NavigationBar />
    {loading > 0 && <Spinner />}
    {children}
    <Footer />
  </div>
);

App.propTypes = {
  children: PropTypes.object.isRequired,
  loading: PropTypes.number.isRequired
};

const mapStateToProps = state => ({
  loading: state.ajaxCallsInProgress
});
export default connect(mapStateToProps)(App);
