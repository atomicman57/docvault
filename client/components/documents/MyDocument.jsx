import React from 'react';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import ReactPaginate from 'react-paginate';
import 'sweetalert/dist/sweetalert.css';
import DocumentCard from './DocumentCard.jsx';

class MyDocument extends React.Component {
  /**
   * Creates an instance of GetDocument.
   * @param {any} props
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

  handlePageClick(data) {
    let selected = data.selected;
    let limit = 8;
    let offset = Math.ceil(selected * limit);
    this.setState({ offset }, () => {
      this.props.userPersonalDocumentRequest(offset, limit).then(() => {
        this.setState({
          document: this.props.documents.documents
        });
      });
    });
  }

  /**
   *
   *
   *
   * @memberof GetDocument
   */
  componentDidMount() {
    if (Object.keys(this.props.currentUser).length > 0) {
      this.props
        .userPersonalDocumentRequest(this.props.currentUser.id)
        .then(() => {
          this.setState({
            document: this.props.documents.documents,
            pageCount: this.props.documents.pagination.pageCount
          });
        });
    }
  }
  /**
   *
   *
   * @param {any} nextProps
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
  confirmDelete(id) {
    swal(
      {
        title: 'Are you sure?',
        text: 'You will not be able to reverse this action!',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#DD6B55',
        confirmButtonText: 'Yes, delete it!',
        closeOnConfirm: false,
        html: false
      },
      () =>
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
        </div>
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

MyDocument.propTypes = {
  currentUser: PropTypes.object.isRequired,
  userDeleteDocumentRequest: PropTypes.func.isRequired,
  userUpdateDocumentRequest: PropTypes.func.isRequired,
  userPersonalDocumentRequest: PropTypes.func.isRequired,
  documentType: PropTypes.string.isRequired,
  documents: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  loading: PropTypes.number.isRequired
};

export default MyDocument;
