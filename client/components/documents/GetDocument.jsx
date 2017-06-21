import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Modal } from 'react-materialize';
import swal from 'sweetalert';
import 'sweetalert/dist/sweetalert.css';
import ReactPaginate from 'react-paginate';
import EditDocument from './EditDocument.jsx';
import { userDocumentRequest } from '../../actions/documentActions';

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
    this.deleteconfirm = this.deleteconfirm.bind(this);
  }

  handlePageClick(data) {
    let selected = data.selected;
    let limit = 8;
    let offset = Math.ceil(selected * limit);
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
      console.log('pagination', this.props.documents.pagination);
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
    const newdocument = nextProps.documents;
    this.setState({ document: newdocument.documents });
  }
  deleteconfirm() {
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
      () => {
        swal('Deleted!', 'Your Document has been deleted.', 'success');
      }
    );
  }
  render() {
    // const { documents } = this.props;
    const { currentUser } = this.props;
    const { document } = this.state;
    const documents = document;
    console.log(this.state.document);
    console.log(documents.documents);
    const { userId } = this.state;
    const { userRoleId } = this.state;
    console.log(userId);
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
          <div className="col s12 m6 l3" key={document.id}>
            <div className="card">
              <div className="card-content black-text">
                <div key={document.id}>
                  <h5 style={{ fontSize: '1.2em' }}>
                    <i className="mdi-social-group-add" /> {document.title}
                  </h5>
                  <p className="card-stats-number">{document.access} </p>
                  <p className="card-stats-compare">
                    <span className="deep-orange-text text-lighten-2">
                      {new Date(document.createdAt).toDateString()}
                    </span>
                  </p>
                  <p
                    className="card-stats-number"
                    style={{ fontSize: '0.8em' }}
                  >
                    View More{' '}
                  </p>
                  {(userId === document.userId || userRoleId === 2) &&
                    <span style={{ padding: '20px' }}>
                      <Modal
                        header="Edit Document"
                        trigger={
                          <a
                            className="btn-floating editbutton"
                            style={{ marginRight: '20px' }}
                          >
                            <i className="material-icons">edit</i>
                          </a>
                        }
                      >
                        <EditDocument currentUser={currentUser} />
                      </Modal>
                      <a
                        onClick={this.deleteconfirm}
                        className="btn-floating deletebutton"
                      >
                        <i className="material-icons">delete</i>
                      </a>
                    </span>}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

GetDocument.propTypes = {
  currentUser: PropTypes.object.isRequired
};
function mapStateToProps(state) {
  return {
    documents: state.Document
  };
}
export default connect(mapStateToProps, { userDocumentRequest })(GetDocument);
