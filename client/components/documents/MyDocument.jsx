import React from 'react';
import PropTypes from 'prop-types';
import DocumentCard from './DocumentCard.jsx';

class MyDocument extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      document: [],
      errors: {}
    };
  }

  confirmDelete() {
    swal(
      {
        title: 'Are you sure?',
        text: 'You will not be able to recover this Document',
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

  componentDidMount() {
    this.props
      .userPersonalDocumentRequest(this.props.currentUser.id)
      .then(() => {
        console.log('props', this.props.documents);
        this.setState({ document: this.props.documents });
      });
  }
  // componentWillReceiveProps(nextProps) {
  //     const newdocument = nextProps.documents;
  //     this.setState({ document: newdocument.documents });
  //   }
  render() {
    const { currentUser } = this.props;
    const { document } = this.state;
    const documents = document;
    return (
      <div>
        
        {/* {documents.map(document => (
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
        ))}*/}
        {documents.map(document => (
          <DocumentCard
            key={document.id}
            document={document}
            currentUser={currentUser}
            confirmDelete={this.confirmDelete}
          />
        ))}

      </div>
    );
  }
}

MyDocument.propTypes = {
  currentUser: PropTypes.object.isRequired,
  userPersonalDocumentRequest: PropTypes.func.isRequired,
  documents: PropTypes.array.isRequired
};

export default MyDocument;
