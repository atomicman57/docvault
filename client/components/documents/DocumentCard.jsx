import React from "react";
import PropTypes from "prop-types";
import { Modal } from "react-materialize";
import renderHTML from "react-render-html";
import EditDocument from "./EditDocument.jsx";
import ViewDocument from "./ViewDocument.jsx";
import jsPDF from "jspdf";
const h2p = require("html2plaintext");
const wrapText = require("wrap-text");

const downloadAsPDf = (title, content, creator) => {
  let doc = new jsPDF({
    // orientation: 'landscape',
    unit: "in",
    format: [11.69, "08.27"]
  });

  doc.text(
    `
  Title: ${title}

  Content: ${wrapText(h2p(content), 50)}

  Creator: ${creator}
  `,
    0.5,
    0.5
  );


  doc.save(`${title}.pdf`);
};

const DocumentCard = ({
  document,
  currentUser,
  confirmDelete,
  userUpdateDocumentRequest,
  documentType
}) => (
  <div>
    <div className="col s12 m6 l3" key={document.id}>
      <div className="card">
        <div className="card-content black-text">
          <div key={document.id}>
            <div className="title">{document.title}</div>
            <hr />
            <div className="document-content">
              {renderHTML(document.content)}
            </div>
            <hr />
            <p className="card-stats-number">Access: {document.access} </p>
            <p className="card-stats-compare">
              <span className="deep-orange-text text-lighten-2">
                Date: {new Date(document.createdAt).toDateString()}
              </span>
            </p>
            <p className="card-stats-number">
              Created by: {document.User.username}
            </p>
            <p className="card-stats-number" style={{ fontSize: "0.8em" }}>
              <Modal
                trigger={
                  <a href="" id="view_more">
                    View More
                  </a>
                }
              >
                <ViewDocument document={document} />
              </Modal>
            </p>
            {(currentUser.id === document.userId ||
              currentUser.roleId === 2) && (
              <span style={{ padding: "20px" }}>
                <Modal
                  header="Edit Document"
                  trigger={
                    <a
                      className="btn-floating editbutton"
                      style={{ marginRight: "20px" }}
                    >
                      <i className="material-icons">edit</i>
                    </a>
                  }
                >
                  <EditDocument
                    document={document}
                    currentUser={currentUser}
                    userUpdateDocumentRequest={userUpdateDocumentRequest}
                    documentType={documentType}
                  />
                </Modal>
                <a
                  onClick={() => confirmDelete(document.id)}
                  className="btn-floating deletebutton"
                >
                  <i className="material-icons">delete</i>
                </a>
              </span>
            )}
            <a
              onClick={() =>
                downloadAsPDf(
                  document.title,
                  document.content,
                  document.User.username
                )
              }
              className="btn-floating deletebutton"
            >
              <i className="material-icons">archive</i>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
);

DocumentCard.defaultProps = {
  documentType: null
};

DocumentCard.propTypes = {
  document: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
  confirmDelete: PropTypes.func.isRequired,
  documentType: PropTypes.string
};

export default DocumentCard;
