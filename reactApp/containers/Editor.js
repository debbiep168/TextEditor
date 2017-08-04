var React = require('react');
var ReactDOM = require('react-dom');
var { Editor, EditorState, RichUtils } = require('draft-js');
var { Dropdown, Button, NavItem } = require('react-materialize');


class TextEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      centerText: {}
    }
    this.onChange = (editorState) => this.setState({editorState});
  }

  _boldText(e) {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
  }

  _italicizeText(e) {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'ITALIC'));
  }

  _underlineText(e) {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'UNDERLINE'));
  }

  _centerText(e) {
    console.log('center');
  }

  render() {
    return (
      <div>
        <p>Sample Document</p>
        <Button>
          Save
        </Button>
        <div>
          <Button onClick={() => this._boldText()}>
            Bold
          </Button>
          <Button onClick={() => this._italicizeText()}>
            Italics
          </Button>
          <Button onClick={() => this._underlineText()}>
            Underline
          </Button>
          <Button>
            Align Left
          </Button>
          <Button onClick={() => this._centerText()}>
            Center
          </Button>
          <Button>
            Align Right
          </Button>
          <Dropdown trigger={
          		<Button>Drop me!</Button>
          	}>
          	<NavItem>one</NavItem>
          	<NavItem>two</NavItem>
          	<NavItem divider />
          	<NavItem>three</NavItem>
          </Dropdown>
          <div>
            <Editor
              editorState={this.state.editorState}
              onChange={this.onChange}
            />
          </div>
        </div>
      </div>
    )
  }
}



module.exports = {
  TextEditor
}
