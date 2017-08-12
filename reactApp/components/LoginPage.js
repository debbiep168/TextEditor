var React = require('react');
var ReactDOM = require('react-dom');
var { Link, Route, Router } = require('react-router-dom');
var axios = require('axios');

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
  }

  login(event) {
    event.preventDefault();
    if (this.state.username === '' && this.state.password === '') {
      alert('Please fill out the fields!');
    }
    else if (this.state.username === '') {
      alert('Please enter your username!');
    }
    else if (this.state.password === '') {
      alert('Please enter your password!');
    }
    else {
      var self = this;
      axios.post('http://localhost:3000/login', {
        username: this.state.username,
        password: this.state.password
      })
      .then(function (response) {
        console.log(response.data.user);
        var userId = response.data.user._id;
        self.props.history.push('/documents');
      })
      .catch(function (error) {
        console.log(error);
      });
      // fetch('http://localhost:3000/login', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     username: this.state.username,
      //     password: this.state.password,
      //   })
      // })
      // .then((response) => response.json())
      // .then((responseJson) => {
      //   console.log('hi', responseJson);
      //   var userId = responseJson.user._id;
      //   this.props.history.push('/documents');
      // })
      // .catch((err) => {
      //   console.log('error', err)
      // })
    }
  }

  render() {
    return(
      <div className="row login-page">
        <p>Login</p>
        <form className="col s12">
          <div className="row">
            <div className="input-field col s6">
              <input id="username" type="text" className="validate" value={this.state.username} onChange={(event) => this.setState({username: event.target.value})}></input>
              <label htmlFor="username">Username</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input id="password" type="password" className="validate" value={this.state.password} onChange={(event) => this.setState({password: event.target.value})}></input>
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

module.exports = LoginPage;
