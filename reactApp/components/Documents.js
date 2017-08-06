var React = require('react');
var ReactDOM = require('react-dom');

class Documents extends React.Component {
  constructor(props) {
    super(props);
  }

  createNew(event) {
    event.preventDefault();
  }

  render() {
    return (
      <div>
      Documents
      <div className="row">
        <form>
          <div className="input-field col s6">
            <input placeholder="New Document Title" id="doctitle" type="text" class="validate"></input>
          </div>
          <button className="waves-effect waves-light btn" onClick={(event) => this.createNew(event)}>
            New
          </button>
        </form>
      </div>
    </div>
    )
  }
}

module.exports = {
  Documents
}
