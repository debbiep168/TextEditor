var React = require('react');
var ReactDOM = require('react-dom');
var { Link, Route, Router } = require('react-router-dom');

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
  }

  login(event) {
    event.preventDefault();
    this.props.history.push('/documents');
  }

  render() {
    return(
      <div className="row">
        <form className="col s12">
          <div className="row">
            <div className="input-field col s6">
              <input id="username" type="text" className="validate"></input>
              <label htmlFor="username">Username</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input id="password" type="password" className="validate"></input>
              <label htmlFor="password">Password</label>
            </div>
          </div>
          <button className="waves-effect waves-light btn" onClick={(event) => this.login(event)}>
          Login
          </button>
        </form>
        <Link to='/register'>Register</Link>
      </div>
    );
  }
}

module.exports = {
  LoginPage
}
