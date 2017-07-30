import React from 'react';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import ReactPaginate from 'react-paginate';
import 'sweetalert/dist/sweetalert.css';

import DocumentCard from './DocumentCard.jsx';
import { deleteQuestion } from '../../utils/constant';

/**
 *
 *
 * @class ListDocument
 * @extends {React.Component}
 */
class ListDocument extends React.Component {
  /**
   * Creates an instance of GetDocument.
   * @param {object} props
   *
   * @memberof GetDocument
   */
  constructor(props) {
    super(props);
    this.state = {
      document: [],
      offset: 0,
      pageCount: 0,
      errors: {}
    };
    this.handlePageClick = this.handlePageClick.bind(this);
    this.confirmDelete = this.confirmDelete.bind(this);
  }

  /**
   *
   *
   * @param {object} data
   * @memberof ListDocument
   */
  handlePageClick(paginationData) {
    const selected = paginationData.selected;
    const limit = 8;
    const offset = Math.ceil(selected * limit);
    this.setState({ offset }, () => {
      if (this.props.documentType !== null) {
        this.props
          .userDocumentRequest(this.props.currentUser.id, offset, limit)
          .then(() => {
            this.setState({
              document: this.props.documents.documents
            });
          });
      } else {
        this.props.userDocumentRequest(offset, limit).then(() => {
          this.setState({
            document: this.props.documents.documents
          });
        });
      }
    });
  }

  /**
   *
   *
   *
   * @memberof GetDocument
   */
  componentDidMount() {
    this.props.userDocumentRequest(this.props.currentUser.id).then(() => {
      this.setState({
        document: this.props.documents.documents,
        pageCount: this.props.documents.pagination.pageCount
      });
    });
  }
  /**
   *
   *
   * @param {object} nextProps
   *
   * @memberof GetDocument
   */
  componentWillReceiveProps(nextProps) {
    const newDocument = nextProps.documents;
    const newPagination = newDocument.pagination;
    if (newPagination) {
      this.setState({
        document: newDocument.documents,
        pageCount: newPagination.pageCount
      });
    }
  }

  /**
   * confirmDelete
   * It display a sweet alert modal to confirm delete
   * @param {number} id
   * @memberof ListDocument
   */
  confirmDelete(id) {
    swal(deleteQuestion, () =>
      this.props
        .userDeleteDocumentRequest(
          id,
          this.props.currentUser.id,
          this.props.documentType
        )
        .then(() => {
          swal('Deleted!', 'Your Document has been deleted.', 'success');
        })
    );
  }

  /**
   *
   *
   * @memberof ListDocument
   */
  render() {
    const {
      currentUser,
      userUpdateDocumentRequest,
      loading,
      documentType
    } = this.props;
    const { document } = this.state;
    const documents = document;
    return (
      <div>
        {document.length !== 0 &&
          <div className="docpagination">
            <ReactPaginate
              previousLabel={'previous'}
              nextLabel={'next'}
              breakLabel={<a href="">...</a>}
              breakClassName={'break-me'}
              pageCount={this.state.pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={this.handlePageClick}
              containerClassName={'pagination'}
              subContainerClassName={'pages pagination'}
              activeClassName={'active'}
            />
          </div>}
        {documents.map(document => (
          <DocumentCard
            document={document}
            key={document.id}
            currentUser={currentUser}
            confirmDelete={this.confirmDelete}
            userUpdateDocumentRequest={userUpdateDocumentRequest}
            documentType={documentType}
          />
        ))}
        {document.length === 0 &&
          !loading &&
          <div className="center-align">
            <h3>No document Found</h3>
          </div>}
      </div>
    );
  }
}

ListDocument.defaultProps = {
  documents: {},
  documentType: null
};

ListDocument.propTypes = {
  currentUser: PropTypes.object.isRequired,
  userDeleteDocumentRequest: PropTypes.func.isRequired,
  userUpdateDocumentRequest: PropTypes.func.isRequired,
  userDocumentRequest: PropTypes.func.isRequired,
  documentType: PropTypes.string,
  documents: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  loading: PropTypes.number.isRequired
};

export default ListDocument;
