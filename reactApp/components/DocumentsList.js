var React = require('react');
var ReactDOM = require('react-dom');
var axios = require('axios');

class DocumentsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      documents: []
    }
  }

  componentWillMount() {
    var self = this;
    axios.get('http://localhost:3000/alldocuments')
    .then(function (response) {
      console.log('docs', response.data.documents);
      // if (response.data.documents) {
      self.setState({documents: response.data.documents});
      // }
      // else {
      //   self.setState({documents: [{title: 'You have no documents yet.'}]});
      // }
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  createNew(event) {
    var self = this;
    event.preventDefault();
    axios.post('http://localhost:3000/newdocument', {
      title: this.state.title,
      text: ''
    })
      .then(function(response) {
        if (response.data.success) {
          console.log(response);
          self.setState({documents: response.data.documents});
        }
      })
      .catch(function(error) {
        console.log(error)
      })
  }

  logout(event) {
    event.preventDefault();
    this.props.history.push('/');
    axios.get('http://localhost:3000/logout')
      .then((response) => {
        console.log('response', response);
        if (response.data.success) {
          // this.props.history.push('/');
          console.log('logged out');
        }
      })
  }

  render() {
    return (
      <div>
      Documents
      <button className="waves-effect waves-light btn" onClick={(event) => this.logout(event)}>
        Logout
      </button>
      <div className="row">
        <form>
          <div className="input-field col s6">
            <input placeholder="New Document Title" id="doctitle" type="text" className="validate" value={this.state.value} onChange={(event) => this.setState({title: event.target.value})}></input>
          </div>
          <button className="waves-effect waves-light btn" onClick={(event) => this.createNew(event)}>
            New
          </button>
        </form>
      </div>
      <ul>
        {this.state.documents.map((doc) =>
          <li key={doc._id}>
            <a onClick={() => this.props.history.push('/editor/' + doc._id)}>
              {doc.title}
            </a>
          </li>)}
      </ul>
    </div>
    )
  }
}

module.exports = DocumentsList;
