import React from 'react';
import swal from 'sweetalert';
// import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import { Modal } from 'react-materialize';
import 'sweetalert/dist/sweetalert.css';
import ReactPaginate from 'react-paginate';
// import EditDocument from './EditDocument.jsx';
import DocumentCard from './DocumentCard.jsx';
// import { userDocumentRequest } from '../../actions/documentActions';

class GetDocument extends React.Component {
  /**
   * Creates an instance of GetDocument.
   * @param {any} props
   *
   * @memberof GetDocument
   */
  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      userRoleId: '',
      document: [],
      offset: 0,
      pageCount: 0,
      errors: {}
    };
    this.handlePageClick = this.handlePageClick.bind(this);
    this.confirmDelete = this.confirmDelete.bind(this);
  }

  handlePageClick(data) {
    const selected = data.selected;
    const limit = 8;
    const offset = Math.ceil(selected * limit);
    this.setState({ offset }, () => {
      this.props.userDocumentRequest(offset, limit).then(() => {
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
    this.setState({
      userId: this.props.currentUser.id,
      userRoleId: this.props.currentUser.roleId
    });
    this.props.userDocumentRequest().then(() => {
      this.setState({
        document: this.props.documents.documents,
        pageCount: this.props.documents.pagination.pageCount
      });
    });
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
    this.setState({
      document: newDocument.documents,
      pageCount: newPagination.pageCount
    });
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
        this.props.userDeleteDocumentRequest(id).then(() => {
          swal('Deleted!', 'Your Document has been deleted.', 'success');
        })
    );
  }
  render() {
    const { currentUser, userUpdateDocumentRequest } = this.props;
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
          />
        ))}
        {document.length == 0 && <h3>No document Found</h3>}
      </div>
    );
  }
}

GetDocument.propTypes = {
  currentUser: PropTypes.object.isRequired,
  userDocumentRequest: PropTypes.func.isRequired,
  userDeleteDocumentRequest: PropTypes.func.isRequired,
  userUpdateDocumentRequest: PropTypes.func.isRequired,
  documents: PropTypes.object.isRequired
};

export default GetDocument;
