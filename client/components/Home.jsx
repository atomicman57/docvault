import React from 'react';
import img1
  from '../assets/images/Document_management_ECM_INSIGHT_papers_LARGE_969x686.jpg';
import img2 from '../assets/images/SAP Document Management.jpg';
import img3 from '../assets/images/digidoc_mainimage.jpg';

class Home extends React.Component {
  render() {
    return (
      <div>
        <div id="index-banner" className="parallax-container">
          <div className="section no-pad-bot">
            <div className="container">
              <br /><br />
              <h1 className="myheader header center text-lighten-2">
                Document Vault
              </h1>
              <div className="row center">
                <h5 className="mydescription header col s12 light">
                  A Robust Document Management System
                </h5>
              </div>
              <div className="row center">
                <a
                  href="/signup"
                  id="download-button"
                  className="mybutton btn-large waves-effect waves-light"
                >
                  Get Started
                </a>
              </div>
              <br /><br />

            </div>
          </div>
          <div className="parallax" id="parallax2">
            <img src={img1} alt="Unsplashed background img 1" />
          </div>
        </div>

        <div className="container">
          <div className="section">

            <div className="row">
              <div className="col s12 m4">
                <div className="icon-block">
                  <h2 className="center myicon">
                    <i className="material-icons">flash_on</i>
                  </h2>
                  <h5 className="center">Speed Document Management</h5>

                  <p className="light">
                    Document Vault is extremely fast, You can save
                    document,retrieve,delete at a very fast rate
                    compare to using paper.
                  </p>
                </div>
              </div>

              <div className="col s12 m4">
                <div className="icon-block">
                  <h2 className="center myicon">
                    <i className="material-icons">group</i>
                  </h2>
                  <h5 className="center">
                    Great User Experience and cost efficient
                  </h5>

                  <p className="light">
                    Document Vault focus mainly on user experience,
                    As a user, you will have great time using the app.
                    It makes you feel like you are keeping
                    document on your local machine.
                    It also is cost efficient, as you do not need to
                    pay anything to use the service
                  </p>
                </div>
              </div>

              <div className="col s12 m4">
                <div className="icon-block">
                  <h2 className="center myicon">
                    <i className="material-icons">settings</i>
                  </h2>
                  <h5 className="center">Easy to work with</h5>

                  <p className="light">
                    Document Vault is very easy to use, you do not need any
                    special training to start using it.
                    Saving document, Editing, Deleting and all other
                    actions you want to perform on your document is extremely
                    easy
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>

        <div className="parallax-container valign-wrapper">
          <div className="section no-pad-bot">
            <div className="container">
              <div className="row center">
                <h5 className="myheader2 header col s12 light">
                  Doc Vault is a system use to track, manage and
                  store documents and reduce paper.
                </h5>
              </div>
            </div>
          </div>
          <div className="parallax" id="parallax2">
            <img
              src={img2}
              className="myimage"
              alt="Unsplashed background img 2"
            />
          </div>
        </div>

        <div className="container">
          <div className="section">

            <div className="row">
              <div className="col s12 center">
                <h3><i className="mdi-content-send brown-text" /></h3>
                <h4>Contact Us</h4>
                <p className="left-align light">
                  Do you have any suggestion, contribution or feedback?
                  or maybe you have any challenge when using the app,<br />
                  Contact us:<br />
                  E-mail: admin@docvault.com <br />
                  Phone number: +000111222333
                </p>
              </div>
            </div>

          </div>
        </div>

        <div className="parallax-container valign-wrapper">
          <div className="section no-pad-bot">
            <div className="container">
              <div className="row center">
                <h5 className="myheader2 header col s12 light">
                  "An App where your Documents are safe,secure and easy to reach"
                </h5>
              </div>
            </div>
          </div>
          <div className="parallax" id="parallax3">
            <img
              src={img3}
              className="myimage"
              alt="Unsplashed background img 3"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
