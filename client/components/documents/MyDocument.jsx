import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import GetDocument from "../documents/GetDocument.jsx";
import {
  userSaveDocumentRequest,
  userDeleteDocumentRequest,
  userUpdateDocumentRequest,
  userSearchRequest,
  userPersonalDocumentRequest,
  categoriesRequest
} from "../../actions/documentActions";

const MyDocument = ({
  userPersonalDocumentRequest,
  userSaveDocumentRequest,
  userDeleteDocumentRequest,
  userSearchRequest,
  userUpdateDocumentRequest,
  documents,
  categoriesRequest,
  currentUser,
  loading
}) => (
  <div>
    <GetDocument
      documentType={"personal"}
      currentUser={currentUser}
      userSaveDocumentRequest={userSaveDocumentRequest}
      userSearchRequest={userSearchRequest}
      loading={loading}
      headingTitle={"My Document"}
      userDeleteDocumentRequest={userDeleteDocumentRequest}
      userUpdateDocumentRequest={userUpdateDocumentRequest}
      userDocumentRequest={userPersonalDocumentRequest}
      documents={documents}
      categoriesRequest={categoriesRequest}
    />
  </div>
);

MyDocument.defaultProps = {
  documents: {}
};

MyDocument.propTypes = {
  currentUser: PropTypes.object.isRequired,
  userDeleteDocumentRequest: PropTypes.func.isRequired,
  userUpdateDocumentRequest: PropTypes.func.isRequired,
  userPersonalDocumentRequest: PropTypes.func.isRequired,
  documents: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  loading: PropTypes.number.isRequired
};

/**
 *
 *
 * @param {object} state
 * @returns
 */
function mapStateToProps(state) {
  return {
    currentUser: state.Auth.user,
    documents: state.Document.documents,
    categories: state.Document.categories,
    loading: state.ajaxCallsInProgress,
    categories: state.Document.categories
  };
}

export default connect(
  mapStateToProps,
  {
    userPersonalDocumentRequest,
    userSaveDocumentRequest,
    userDeleteDocumentRequest,
    userUpdateDocumentRequest,
    userSearchRequest,
    categoriesRequest
  }
)(MyDocument);
