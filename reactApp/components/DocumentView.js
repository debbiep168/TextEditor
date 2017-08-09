var React = require('react');
var ReactDOM = require('react-dom');
var TextEditor = require('./Editor');
var axios = require('axios');

class DocumentView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      text: ''
    }
  }

  componentWillMount() {
    var self = this;
    axios.get('http://localhost:3000/document/' + this.props.match.params.id)
    .then(function (response) {
      console.log('docs', response);
      self.setState({
        title: response.data.document.title,
        text: response.data.document.text
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  saveDocument(event, input) {
    event.preventDefault();
    console.log(input)
    this.setState({text: input.blocks["0"].text});
    axios.post('http://localhost:3000/savedocument', {
      title: this.state.title,
      text: input.blocks["0"].text,
      docId: this.props.match.params.id
    })
    .then(() => {
      alert('Document was successfully saved!');
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
        <TextEditor
          title={this.state.title}
          saveDocument={this.saveDocument.bind(this)}
        />
      </div>
    )
  }
}


module.exports = DocumentView;
