import React from 'react';
import PropTypes from 'prop-types';

const UsersCard = ({ user, confirmDelete }) => (
  <div>
    <div className="col s12 m6 l3" key={user.id}>
      <div className="card userscard">
        <div className="card-content black-text">
          <div key={user.id}>
            <div className="title">
              {user.firstname} {user.lastname}
            </div>
            <hr />
            <p className="card-stats-number">Email: {user.email} </p>
            <hr />
            <p className="card-stats-number">
              Username: {user.username}{' '}
            </p>
            <p className="card-stats-number">
              User Type: {user.Role.title}
            </p>
            <p className="card-stats-compare">
              <span className="deep-orange-text text-lighten-2">
                Joined: {new Date(user.createdAt).toDateString()}
              </span>
            </p>
            <p className="card-stats-number" style={{ fontSize: '0.8em' }} />
            <span style={{ padding: '20px' }}>
              <a
                onClick={() => confirmDelete(user.id)}
                className="btn-floating deletebutton"
              >
                <i className="material-icons">delete</i>
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

UsersCard.propTypes = {
  user: PropTypes.object.isRequired,
  confirmDelete: PropTypes.func.isRequired
};

export default UsersCard;
