var React = require('react');
var ReactDOM = require('react-dom');
var { Editor, EditorState } = require('draft-js');


class TextEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty()
    };
    this.onChange = (editorState) => this.setState({editorState});
  }
  render() {
    return (
      <Editor
        editorState={this.state.editorState}
        onChange={this.onChange}
      />
    );
  }
}

module.exports = {
  TextEditor
}
