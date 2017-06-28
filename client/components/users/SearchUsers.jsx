import React from 'react';
import PropTypes from 'prop-types';

class SearchDocument extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    this.setState({ errors: {} });
  }
  onSubmit(event) {
    event.preventDefault();
    this.props
      .userSearchRequest(
        this.state.search
      )
      .then()
      .catch((error) => {
        this.setState({ errors: error.response.data });
        const { errors } = this.state;
        const $toastContent = `<span>${errors.message}</span>`;
        Materialize.toast($toastContent, 5000);
      });
  }
  render() {
    return (
      <div>
        <form id="searchForm" className="search-form" onSubmit={this.onSubmit}>
          <div className="box">
            <div className="container-3">
              <span className="icon"><i className="fa fa-search" /></span>
              <input
                type="search"
                id="search"
                name="search"
                onChange={this.onChange}
                placeholder="Search..."
                value={this.state.search}
              />
            </div>
          </div>
          <button type="submit" className="search-button"> Search </button>
        </form>
      </div>
    );
  }
}

SearchDocument.propTypes = {
  currentUser: PropTypes.object.isRequired,
  //   userPersonalDocumentRequest: PropTypes.func.isRequired,
  userSearchRequest: PropTypes.func.isRequired
  //   documents: PropTypes.object.isRequired
};

export default SearchDocument;
