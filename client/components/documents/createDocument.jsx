import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TinyMCE from 'react-tinymce';
import SelectInput from '../common/SelectInput.jsx';
import TextInput from '../common/TextInput.jsx';
import { userSaveDocumentRequest } from '../../actions/documentActions';

class CreateDocument extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
      userId: 2,
      access: 'public',
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
    this.props.userSaveDocumentRequest(this.state)
      .then(() => {
        alert('SuccesFul');
      })
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
        <form className="col s12" onSubmit={this.onSubmit}>
          <div className="row">
            <input
              id="icon_prefix"
              type="text"
              name="title"
              value={this.state.title}
              onChange={this.onChange}
              className="validate"
              required
              icon="book"
            />
            <select style={{ display: 'block' }}>
              <option value="null">Public</option>
              <option value="1">Private</option>
              <option value="1">Role</option>
            </select>
            <br />
            <textarea
              name="content"
              value={this.state.content}
              onChange={this.onChange}
              className="validate"
              required
              icon="book"
            />
            <div className="input-field center">
              <button className="waves-effect btn">Save</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default connect(null, { userSaveDocumentRequest })(CreateDocument);
