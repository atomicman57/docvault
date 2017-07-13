import React from 'react';
import PropTypes from 'prop-types';

/**
 *
 *
 * @class SearchDocument
 * @extends {React.Component}
 */
class SearchDocument extends React.Component {
  /**
   * Creates an instance of SearchDocument.
   * @param {any} props
   * @memberof SearchDocument
   */
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
   *
   *
   * @param {any} event
   * @memberof SearchDocument
   */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
   *
   *
   * @param {any} event
   * @memberof SearchDocument
   */
  onSubmit(event) {
    event.preventDefault();
    this.props.userSearchRequest(this.state.search);
  }

  /**
   *
   *
   * @returns
   * @memberof SearchDocument
   */
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
  userSearchRequest: PropTypes.func.isRequired
};

export default SearchDocument;
