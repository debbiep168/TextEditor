var React = require('react');
var ReactDOM = require('react-dom');
var TextEditor = require('./Editor');
var axios = require('axios');

class DocumentView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Loading...',
      text: 'Loading...'
    }
  }

  componentWillMount() {
    var self = this;
    axios.get('http://localhost:3000/document/' + this.props.match.params.id)
    .then(function (response) {
      console.log('RESPONSE', response);
      self.setState({
        title: response.data.document.title
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  saveDocument(input) {
    //event.preventDefault();
    console.log(input)
    //this.setState({text: input.blocks["0"].text});
    axios.post('http://localhost:3000/savedocument', {
      title: this.state.title,
      text: input,
      docId: this.props.match.params.id
    })
    .then(() => {
      // alert.info("document has been saved!", {
      //       position: 'top',
      //       effect: 'flip',
      //       timeout: 10000,
      //       offset: 100
      //     })
      alert('Saved Document!');
    })
    .catch((error) => {
      console.log(error);
    })
  }

  render() {
    return (
      <div>
        <button className="waves-effect waves-light btn" onClick={() => this.props.history.push('/documents')}>
          Go Back
        </button>
        <input placeholder="User Id" id="doctitle" type="text" className="validate" value={this.state.value} onChange={(event) => this.setState({title: event.target.value})}></input>
        <button className="waves-effect waves-light btn">
          Add Collaborator
        </button>
        <TextEditor
          title={this.state.title}
          saveDocument={this.saveDocument.bind(this)}
          documentId={this.props.match.params.id}
          editorState={this.state.text}
        />
      </div>
    )
  }
}


module.exports = DocumentView;
