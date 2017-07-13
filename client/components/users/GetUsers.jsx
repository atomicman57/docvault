import React from 'react';
import swal from 'sweetalert';
import PropTypes from 'prop-types';
import 'sweetalert/dist/sweetalert.css';
import ReactPaginate from 'react-paginate';

import UsersCard from './UsersCard.jsx';
import { deleteQuestion } from '../../utils/constant';

/**
 *
 *
 * @class GetUsers
 * @extends {React.Component}
 */
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

  /**
   *
   *
   * @param {any} data
   * @memberof GetUsers
   */
  handlePageClick(data) {
    const selected = data.selected;
    const limit = 8;
    const offset = Math.ceil(selected * limit);
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
    if (newPagination) {
      this.setState({
        users: newUser.users,
        pageCount: newPagination.pageCount
      });
    }
  }

  /**
   *
   *
   * @param {any} id
   * @memberof GetUsers
   */
  confirmDelete(id) {
    swal(deleteQuestion, () =>
      this.props.DeleteUserRequest(id).then(() => {
        swal('Deleted!', 'The User has been deleted.', 'success');
      })
    );
  }

  /**
   *
   *
   * @returns
   * @memberof GetUsers
   */
  render() {
    const { currentUser, loading } = this.props;
    const { users } = this.state;
    const mappedUsers = users.map(user => (
      <UsersCard
        user={user}
        key={user.id}
        currentUser={currentUser}
        confirmDelete={this.confirmDelete}
      />
    ));
    return (
      <div>
        {users.length !== 0 &&
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
        {mappedUsers}
        {users.length === 0 &&
          !loading &&
          <div className="center-align">
            <h3>No User Found</h3>
          </div>}
      </div>
    );
  }
}

GetUsers.defaultProps = {
  users: {},
};

GetUsers.propTypes = {
  currentUser: PropTypes.object.isRequired,
  DeleteUserRequest: PropTypes.func.isRequired,
  users: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  loading: PropTypes.number.isRequired
};
export default GetUsers;
