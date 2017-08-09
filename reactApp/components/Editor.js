var React = require('react');
var ReactDOM = require('react-dom');
var { Editor,
  EditorState,
  RichUtils,
  Immutable,
  Draft,
  Modifier,
  convertToRaw
} = require('draft-js');
const {
  extendedBlockRenderMap,
  colors,
  fontSizes,
  styleMap,
  fontStyles
} = require('./editorStyling');

class TextEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty()
    }
    this._fontStyle = this._fontStyle.bind(this);
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

  _alignLeftText(e) {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, 'align-left'));
  }

  _centerText(e) {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, 'align-center'));
  }

  _alignRightText(e) {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, 'align-right'));
  }

  _strikeThroughText(e) {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'STRIKETHROUGH'));
  }

  _bulletedList(e) {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, 'unordered-list-item'));
  }

  _toCode(e) {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'CODE'));
  }

  _fontStyle(selectId, arr) {
    // get value currently selected in dropdown menu
    let e = document.getElementById(selectId);
    let toggledStyle = e.options[e.selectedIndex].value;
    // get editor state and selection state
    const { editorState } = this.state;
    const selection = editorState.getSelection();
    // remove all other inline styling of this type to avoid toggling conflicts
    const nextContentState = arr.reduce((contentState, style) => {
        return Modifier.removeInlineStyle(contentState, selection, style)
      }, editorState.getCurrentContent());

    let nextEditorState = EditorState.push(
      editorState,
      nextContentState,
      'change-inline-style'
    );
    const currentStyle = editorState.getCurrentInlineStyle();
    // unset style override for current style
    if (selection.isCollapsed()) {
      nextEditorState = currentStyle.reduce((state, style) => {
        return RichUtils.toggleInlineStyle(state, style);
      }, nextEditorState);
    }
    // if this style is being toggled on, apply it
    if (!currentStyle.has(toggledStyle)) {
      nextEditorState = RichUtils.toggleInlineStyle(
        nextEditorState,
        toggledStyle
      );
    }
    // updates editor state
    this.onChange(nextEditorState);
  }

  render() {
    let counter = 0;
    return (
      <div>
        <p><b>{this.props.title}</b></p>
        <button className="waves-effect waves-light btn"
          onClick={(event) => this.props.saveDocument(event, convertToRaw(this.state.editorState.getCurrentContent()))}>
          Save
        </button>
        <div>
          <select className={"browser-default"} id="fontSize" onChange={() => this._fontStyle("fontSize", fontSizes)}>
              {fontSizes.map(size => <option key={counter++} value={size}> {size} </option>)}
          </select>
          <select className={"browser-default"} id="fontColor" onChange={() => this._fontStyle("fontColor", colors)}>
              {colors.map(color => <option key={counter++} value={color}> {color} </option>)}
          </select>
          <select className={"browser-default"} id="fontStyle" onChange={() => this._fontStyle("fontStyle", fontStyles)}>
              {fontStyles.map(style => <option key={counter++} value={style}> {style} </option>)}
          </select>
          <button className="waves-effect waves-light btn" onClick={() => this._toCode()}>
             <i className="material-icons">code</i>
          </button>
          <button className="waves-effect waves-light btn" onClick={() => this._boldText()}>
             <i className="material-icons">format_bold</i>
          </button>
          <button className="waves-effect waves-light btn" onClick={() => this._italicizeText()}>
             <i className="material-icons">format_italic</i>
          </button>
          <button className="waves-effect waves-light btn" onClick={() => this._underlineText()}>
            <i className="material-icons">format_underline</i>
          </button>
          <button className="waves-effect waves-light btn" onClick={() => this._alignLeftText()}>
            <i className="material-icons">format_align_left</i>
          </button>
          <button className="waves-effect waves-light btn" onClick={() => this._centerText()}>
            <i className="material-icons">format_align_center</i>
          </button>
          <button className="waves-effect waves-light btn" onClick={() => this._alignRightText()}>
            <i className="material-icons">format_align_right</i>
          </button>
          <button className="waves-effect waves-light btn" onClick={() => this._strikeThroughText()}>
            <i className="material-icons">strikethrough_s</i>
          </button>
          <button className="waves-effect waves-light btn" onClick={() => this._bulletedList()}>
            <i className="material-icons">format_list_bulleted</i>
          </button>
          <button className="waves-effect waves-light btn">
            <i className="material-icons">format_list_numbered</i>
          </button>
          <div style={styles.editor}>
            <Editor
              blockRenderMap={extendedBlockRenderMap}
              customStyleMap={styleMap}
              editorState={this.state.editorState}
              onChange={this.onChange}
            />
        </div>
        </div>
      </div>
    )
  }
}

const styles = {
  editor: {
    borderRadius: 100,
    borderColor: 'black'
  }
}



module.exports = TextEditor;
