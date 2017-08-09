var React = require('react');
var ReactDOM = require('react-dom');
var { Link, Route, Router } = require('react-router-dom');
var { LoginPage } = require('./LoginPage');

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      passwordRepeat: ''
    }
  }

  register(event) {
    event.preventDefault();
    if (this.state.username === '' && this.state.password === '' && this.state.passwordRepeat === '') {
      alert('Please do not leave any fields empty!');
    }
    else if (this.state.username === '') {
      alert('Please enter a username!');
    }
    else if (this.state.password === '') {
      alert('Please enter a password!');
    }
    else if (this.state.passwordRepeat === '') {
      alert('Please confirm your password!');
    }
    else if (this.state.password !== this.state.passwordRepeat) {
      alert('Passwords do not match!');
    }
    else {
      fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password,
        })
      })
      .then((response) => {
        response.json();
        console.log(response);
        this.props.history.push('/');
      })
      .catch((err) => {
        console.log('error', err)
      })
    }
  }

  render() {
    return(
      <div className="row">
        <p>Register</p>
        <form className="col s12">
          <div className="row">
            <div className="input-field col s6">
              <input id="username"
                type="text"
                className="validate"
                value={this.state.username}
                onChange={(event) => this.setState({username: event.target.value})}>
              </input>
              <label htmlFor="username">Username</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input id="password"
                type="password"
                className="validate"
                value={this.state.password}
                onChange={(event) => this.setState({password: event.target.value})}>
              </input>
              <label htmlFor="password">Password</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input id="passwordrepeat"
                type="password"
                className="validate"
                value={this.state.passwordRepeat}
                onChange={(event) => this.setState({passwordRepeat: event.target.value})}>
              </input>
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


module.exports = Register;
