import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import GetDocument from "../documents/GetDocument.jsx";
import {
  userDocumentRequest,
  userDeleteDocumentRequest,
  userUpdateDocumentRequest,
  userSearchRequest,
  userSaveDocumentRequest,
  categoriesRequest
} from "../../actions/documentActions";

/**
 *
 *
 * @class Dashboard
 * @extends {React.Component}
 */
const Dashboard = ({
  currentUser,
  userSaveDocumentRequest,
  userDocumentRequest,
  userDeleteDocumentRequest,
  userSearchRequest,
  userUpdateDocumentRequest,
  categoriesRequest,
  documents,
  categories,
  loading
}) => (
  <div>
    <GetDocument
      headingTitle={"Dashboard"}
      currentUser={currentUser}
      userSaveDocumentRequest={userSaveDocumentRequest}
      userSearchRequest={userSearchRequest}
      loading={loading}
      userDeleteDocumentRequest={userDeleteDocumentRequest}
      userUpdateDocumentRequest={userUpdateDocumentRequest}
      userDocumentRequest={userDocumentRequest}
      documents={documents}
      categoriesRequest={categoriesRequest}
      categories={categories}
    />
  </div>
);

Dashboard.defaultProps = {
  documents: []
};

Dashboard.propTypes = {
  userSearchRequest: PropTypes.func.isRequired,
  userUpdateDocumentRequest: PropTypes.func.isRequired,
  documents: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  userSaveDocumentRequest: PropTypes.func.isRequired,
  userDocumentRequest: PropTypes.func.isRequired,
  userDeleteDocumentRequest: PropTypes.func.isRequired,
  loading: PropTypes.number.isRequired,
  currentUser: PropTypes.object.isRequired
};

/**
 * mapStateToProps
 *
 * @param {object} state
 * @returns
 */
function mapStateToProps(state) {
  return {
    loading: state.ajaxCallsInProgress,
    isAuthenticated: state.Auth.isAuthenticated,
    currentUser: state.Auth.user,
    documents: state.Document.documents,
    categories: state.Document.categories
  };
}

export default connect(
  mapStateToProps,
  {
    userUpdateDocumentRequest,
    userSaveDocumentRequest,
    userDocumentRequest,
    userDeleteDocumentRequest,
    userSearchRequest,
    categoriesRequest
  }
)(Dashboard);
