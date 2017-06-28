import React from 'react';
import swal from 'sweetalert';
import PropTypes from 'prop-types';
import 'sweetalert/dist/sweetalert.css';
import ReactPaginate from 'react-paginate';
import UsersCard from './UsersCard.jsx';


class GetUsers extends React.Component {
  /**
   * Creates an instance of GetUsers.
   * @param {any} props
   *
   * @memberof GetUsers
   */
  constructor(props) {
    super(props);
    this.state = {
      users: [],
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
      this.props.getUsersRequest(offset, limit).then(() => {
        this.setState({
          users: this.props.users.users
        });
      });
    });
  }

  /**
   *
   *
   *
   * @memberof GetUsers
   */
  componentDidMount() {
    this.props.getUsersRequest().then(() => {
      this.setState({
        users: this.props.users.users,
        pageCount: this.props.users.pagination.pageCount
      });
    });
  }
  /**
   *
   *
   * @param {any} nextProps
   *
   * @memberof GetUsers
   */
  componentWillReceiveProps(nextProps) {
    const newUser = nextProps.users;
    const newPagination = newUser.pagination;
    this.setState({
      users: newUser.users,
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
        this.props.DeleteUserRequest(id).then(() => {
          swal('Deleted!', 'The User has been deleted.', 'success');
        })
    );
  }
  render() {
    const { currentUser } = this.props;
    const { users } = this.state;
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
        {users.map(user => (
          <UsersCard
           user={user}
            key={user.id}
            currentUser={currentUser}
            confirmDelete={this.confirmDelete}
          />
        ))}
        {/*{document.length == 0 && <h3>No document Found</h3>}*/}
      </div>
    );
  }
}

GetUsers.propTypes = {
  currentUser: PropTypes.object.isRequired,
//   userDocumentRequest: PropTypes.func.isRequired,
  DeleteUserRequest: PropTypes.func.isRequired,
//   userUpdateDocumentRequest: PropTypes.func.isRequired,
  users: PropTypes.object.isRequired
};
// function mapStateToProps(state) {
//   return {
//     documents: state.Document
//   };
// }
export default GetUsers;
