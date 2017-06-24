import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Modal } from 'react-materialize';
import CreateDocument from '../documents/CreateDocument.jsx';
import MyProfile from '../users/MyProfile.jsx';
import * as AuthActions from '../../actions/authActions';

class MyDocumentPage extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  componentWillMount() {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      this.userId = this.props.currentUser.id;
      this.firstname = this.props.currentUser.firstname;
      this.lastname = this.props.currentUser.lastname;
      this.username = this.props.currentUser.username;
      this.email = this.props.currentUser.email;
    }
  }
  render() {
    const { currentUser } = this.props;
    return (
      <div>
        <div className="page">
          <main>
            <div className="breadcrumb grey lighten-3">
              <h6>
                My Profile
              </h6>
            </div>
            <div className="row">
              <MyProfile currentUser={currentUser} />
              {/*<div className="col s12 m6 l3">
                <div className="card">
                  <div className="card-content black-text">
                    <p><i className="mdi-social-group-add" /> Document 1</p>
                    <h4 className="card-stats-number">Test Doc</h4>
                    <p className="card-stats-compare">
                      <i className="mdi-hardware-keyboard-arrow-up" />
                      {' '}
                      15%
                      {' '}
                      <span className="deep-orange-text text-lighten-2">
                        from yesterday
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col s12 m6 l3">
                <div className="card">
                  <div className="card-content black-text">
                    <p><i className="mdi-editor-attach-money" />Total Sales</p>
                    <h4 className="card-stats-number">$1990.63</h4>
                    <p className="card-stats-compare">
                      <i className="mdi-hardware-keyboard-arrow-up" />
                      {' '}
                      70%
                      {' '}
                      <span className="deep-orange-text text-lighten-2">
                        last month
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col s12 m6 l3">
                <div className="card">
                  <div className="card-content black-text">
                    <p><i className="mdi-action-trending-up" /> Your Profit</p>
                    <h4 className="card-stats-number">$500.52</h4>
                    <p className="card-stats-compare">
                      <i className="mdi-hardware-keyboard-arrow-up" />
                      {' '}
                      80%
                      {' '}
                      <span className="deep-orange-text text-lighten-2">
                        from yesterday
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col s12 m6 l3">
                <div className="card">
                  <div className="card-content black-text">
                    <p>
                      <i className="mdi-editor-insert-drive-file" />
                      {' '}
                      New Requests
                    </p>
                    <h4 className="card-stats-number">25</h4>
                    <p className="card-stats-compare">
                      <i className="mdi-hardware-keyboard-arrow-down" />
                      {' '}
                      3%
                      {' '}
                      <span className="deep-orange-text text-lighten-2">
                        from last month
                      </span>
                    </p>
                  </div>
                </div>
              </div>*/}
            </div>
            {/*<div className="row">
              <div className="col s12 m12 l6">
                <ul id="projects-collection" className="collection">
                  <li className="collection-item avatar">
                    <i className="material-icons circle pink darken-4">
                      clear_all
                    </i>
                    <span className="collection-header">System Process</span>
                    <p>
                      Queued
                    </p>
                    <a href="#" className="secondary-content">
                      <i className="material-icons grey-text">refresh</i>
                    </a>
                  </li>
                  <li className="collection-item">
                    <small>Checking queue</small>
                    <div className="progress grey lighten-3">
                      <div className="indeterminate grey" />
                    </div>
                  </li>
                </ul>
              </div>
              <div className="col s12 m12 l6">
                <ul id="projects-collection" className="collection">
                  <li className="collection-item avatar">
                    <i className="material-icons circle pink darken-4">
                      bug_report
                    </i>
                    <span className="collection-header">Issues</span>
                    <p>
                      <span className="pink-text darken-text-4">4</span>
                      Detected
                    </p>
                    <a href="#" className="secondary-content">
                      <i className="material-icons grey-text">refresh</i>
                    </a>
                  </li>
                  <li className="collection-item">
                    <small>Tracking issues</small>
                    <div className="progress grey lighten-3">
                      <div className="indeterminate grey" />
                    </div>
                  </li>
                </ul>
              </div>
            </div>*/}
          </main>

          {/*<main>
            <div id="shell" className="shell">
              <div className="shell-header">
                <a href="#" className="deep-orange black-text">
                  <i className="material-icons">clear</i>
                </a>
                <a className="grey darken-2 black-text" href="#">
                  <i className="material-icons">remove</i>
                </a>
                <a className="grey darken-2 black-text" href="#">
                  <i className="material-icons">crop_square</i>
                </a>
              </div>
              <div className="shell-content">
                <h6 className="red-text text-accent-3">
                  DOC VAULT SHELL v1.0.2
                </h6>
                <div className="grey-text">
                  Powered by
                  Doc Vault Server
                </div>
                <div className="white-text text-lighten-3">
                  Welcome back {this.username}!
                </div>
                <div className="deep-orange-text text-accent-1">
                  host01:{this.username} root$
                </div>
                <div className="deep-orange-text text-accent-1">
                  host01:{this.username} root$ sudo
                </div>
                <div className="deep-orange-text text-accent-1">
                  Your password:
                </div>
                <div className="deep-orange-text text-accent-1">
                  host01:{this.username} root$

                  <span className="deep-orange-text text-lighten-4">
                    ls -la
                  </span>
                </div>
                <div className="deep-orange-text text-accent-1">
                  host01:{this.username} root$
                  <span className="deep-orange-text text-lighten-4">
                    usr/ bin/ etc/ var/ .git .gitignore
                  </span>
                </div>
                <div className="deep-orange-text text-accent-1">
                  host01:{this.username} root$
                  <span className="deep-orange-text text-lighten-4">
                    git clone git@github.com:720kb/hubuntu-ui.git hubuntu-ui
                  </span>
                </div>
                <div className="deep-orange-text text-accent-1">
                  host01:{this.username} root$
                  <span className="deep-orange-text text-lighten-4">
                    cd hubuntu-ui/
                  </span>
                </div>
                <div className="deep-orange-text text-accent-1">
                  host01:{this.username} root$

                  <span className="deep-orange-text text-lighten-4">
                    bower install
                  </span>
                </div>
                <div className="deep-orange-text text-accent-1">
                  host01:{this.username} root$

                  <span className="deep-orange-text text-lighten-4">
                    python -m SimpleHTTPServer
                  </span>
                  <span className="blink white-text">|</span>
                </div>
              </div>
            </div>
          </main>*/}
        </div>
        <Modal
          header="Create Document"
          trigger={
            <div className="fixed-action-btn">
              <a className="btn-floating btn-large pink darken-4">
                <i className="large white-text material-icons">edit</i>
              </a>
            </div>
          }
        >
          <CreateDocument currentUser={currentUser} />
        </Modal>
      </div>
    );
  }
}

MyDocumentPage.propTypes = {
  currentUser: PropTypes.object.isRequired
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign({}, AuthActions), dispatch)
  };
}

function mapStateToProps(state) {
  return {
    currentUser: state.Auth.user
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MyDocumentPage);