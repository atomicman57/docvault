import React from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import PropTypes from 'prop-types';
import { convertToHTML } from 'draft-convert';

class CreateDocument extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
      access: '',
      editorState: '',
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onEditorStateChange = this.onEditorStateChange.bind(this);
  }
  /**
   *
   *
   * @param {any} event
   *
   * @memberof CreateDocument
   */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
    this.setState({ errors: {} });
  }

  /**
   *
   *
   * @param {any} editorState
   *
   * @memberof CreateDocument
   */
  onEditorStateChange(editorState) {
    this.setState({
      editorState,
      content: convertToHTML(editorState.getCurrentContent())
    });
  }

  /**
   *
   *
   * @param {any} event
   *
   * @memberof CreateDocument
   */
  onSubmit(event) {
    event.preventDefault();
    if (this.state.content.length > 12) {
      this.props
        .userSaveDocumentRequest(
          this.state,
          this.props.currentUser.id,
          this.props.documentType
        )
        .then(() => {
          const $toastContent =
            '<span id="doc_success">Document Created Successfully</span>';
          Materialize.toast($toastContent, 5000);
        })
        .catch((error) => {
          this.setState({ errors: error.response.data });
          const { errors } = this.state;
          const $toastContent = `<span>${errors.message}</span>`;
          Materialize.toast($toastContent, 5000);
        });
    } else {
      const $toastContent =
        '<span id="doc_failure"> Content length must be atleast 5 </span>';
      Materialize.toast($toastContent, 5000);
    }
  }

  render() {
    const { editorState } = this.state;
    return (
      <div>
        <form className="col s12" onSubmit={this.onSubmit}>
          <div className="row">
            <input
              id="icon_prefix"
              type="text"
              name="title"
              placeholder="Title"
              value={this.state.title}
              onChange={this.onChange}
              className="validate"
              required
              icon="book"
            />
            <select
              name="access"
              required
              defaultValue=""
              style={{ display: 'block' }}
              onChange={this.onChange}
            >
              <option value="">Select Access</option>
              <option value="public">Public</option>
              <option value="private">Private</option>
              <option value="role">Role</option>
            </select>
            <br />
            <div className="editbox">
              <Editor
                editorState={editorState}
                toolbarClassName="home-toolbar"
                wrapperClassName="home-wrapper"
                editorClassName="home-editor"
                onEditorStateChange={this.onEditorStateChange}
              />
            </div>
            <div className="input-field center">
              <button className="pink darken-4 btn" id="save-doc">Save</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

CreateDocument.propTypes = {
  currentUser: PropTypes.object.isRequired,
  userSaveDocumentRequest: PropTypes.func.isRequired,
  documentType: PropTypes.string
};
export default CreateDocument;
