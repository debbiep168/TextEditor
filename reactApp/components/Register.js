var React = require('react');
var ReactDOM = require('react-dom');
var { Link, Route, Router } = require('react-router-dom');
var { LoginPage } = require('./LoginPage');

class Register extends React.Component {
  constructor(props) {
    super(props);
  }

  register(event) {
    event.preventDefault();
    this.props.history.push('/');
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
          <div className="row">
            <div className="input-field col s12">
              <input id="passwordrepeat" type="password" className="validate"></input>
              <label htmlFor="passwordrepeat">Repeat Password</label>
            </div>
          </div>
          <button className="waves-effect waves-light btn" onClick={(event) => this.register(event)}>
          Register
          </button>
        </form>
        <Link to='/'>Login</Link>
      </div>
    );
  }
}


module.exports = {
  Register
}
