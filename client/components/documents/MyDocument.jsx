import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { userPersonalDocumentRequest } from '../../actions/documentActions';

class MyDocument extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      document: [],
      errors: {}
    };
  }
  componentDidMount() {
    this.props.userPersonalDocumentRequest(this.props.currentUser.id).then(() => {
      console.log('props', this.props.documents);
      this.setState({ document: this.props.documents });
    });
  }
  // componentWillReceiveProps(nextProps) {
  //     const newdocument = nextProps.documents;
  //     this.setState({ document: newdocument.documents });
  //   }
  render() {
    // const { documents } = this.props;
    const { document } = this.state;
    const documents = document;
    console.log(this.state.document);
    // console.log(documents.documents);
    
    return (
      <div>
        {documents.map(document => (
          <div className="col s12 m6 l3" key={document.id}>
            <div className="card">
              <div className="card-content black-text">
                <div key={document.id}>
                  <h5 style={{fontSize: '1.2em' }}>
                    <i className="mdi-social-group-add" /> {document.title}
                  </h5>
                  <p className="card-stats-number">{document.access} </p>
                  <p className="card-stats-compare">
                    <span className="deep-orange-text text-lighten-2">
                     {new Date(document.createdAt).toDateString()}
                    </span>
                  </p>
                  <p className="card-stats-number" style={{fontSize: '0.8em' }}>View More </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

MyDocument.propTypes = {
  currentUser: PropTypes.object.isRequired,
};
function mapStateToProps(state) {
  return {
    documents: state.Document
  };
}
export default connect(mapStateToProps, { userPersonalDocumentRequest })(MyDocument);
