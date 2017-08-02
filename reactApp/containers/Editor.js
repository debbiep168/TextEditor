var React = require('react');
var ReactDOM = require('react-dom');
var { TextEditor } = require('../components/TextEditor');

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boldText: {},
      centerText: {}
    }
  }

  _boldText(e) {
    console.log('here!');
    this.setState({
      boldText: {
        fontWeight: 'bold'
      }
    })
  }

  _centerText(e) {
    console.log('center');
  }

  render() {
    return (
      <div>
        <p>Sample Document</p>
        <button>
          Save
        </button>
        <div>
          <button onClick={() => this._boldText()}>
            Bold
          </button>
          <button>
            Italics
          </button>
          <button>
            Underline
          </button>
          <button>
            Align Left
          </button>
          <button onClick={() => this._centerText()}>
            Center
          </button>
          <button>
            Align Right
          </button>
          <div>
            <TextEditor />
          </div>
        </div>
      </div>
    )
  }
}



module.exports = {
  Editor
}
