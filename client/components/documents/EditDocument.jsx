import React from 'react';
import { connect } from 'react-redux';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import PropTypes from 'prop-types';
import { Modal } from 'react-materialize';
import { userSaveDocumentRequest } from '../../actions/documentActions';
import { convertToHTML } from 'draft-convert';

class EditDocument extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
      userId: '',
      access: '',
      userRoleId: '',
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
   * @memberof EditDocument
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
   * @memberof EditDocument
   */
  onEditorStateChange(editorState) {
    this.setState({
      editorState, content: convertToHTML(editorState.getCurrentContent()) });
  }

  /**
   * 
   * 
   * @param {any} event 
   * 
   * @memberof EditDocument
   */
  onSubmit(event) {
    event.preventDefault();
    this.props.userSaveDocumentRequest(this.state)
      .then(() => {
        const $toastContent = '<span>Document Created Successfully</span>';
        Materialize.toast($toastContent, 5000);
      })
      .catch((error) => {
        this.setState({ errors: error.response.data });
        const { errors } = this.state;
        const $toastContent = `<span>${errors.message}</span>`;
        Materialize.toast($toastContent, 5000);
      });
  }
  componentDidMount(){
     this.setState({ userId: this.props.currentUser.id, userRoleId: this.props.currentUser.roleId });
  }
  render() {
    const { editorState } = this.state;
    console.log(this.state.content);
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
            <select name="access" required defaultValue="" style={{ display: 'block' }} onChange={this.onChange}>
              <option value="" >Select Role</option>
              <option value="public">Public</option>
              <option value="private">Private</option>
              <option value="role">Role</option>
            </select>
            <br />
            {/*<textarea
              name="content"
              value={this.state.content}
              onChange={this.onChange}
              className="validate"
              required
              icon="book"
            />*/}
             <div className="editbox"><Editor 
             editorState={editorState}
            toolbarClassName="home-toolbar"
            wrapperClassName="home-wrapper"
            editorClassName="home-editor"
             onEditorStateChange={this.onEditorStateChange}
              /> </div>
            <div className="input-field center">
              <button className="pink darken-4 btn">Save</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

EditDocument.propTypes = {
  currentUser: PropTypes.object.isRequired,
};
export default connect(null, { userSaveDocumentRequest })(EditDocument);

