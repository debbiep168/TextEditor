var React = require('react');
var ReactDOM = require('react-dom');
var { HashRouter, Route, IndexRoute, BrowserRouter, Link, Switch } = require('react-router-dom');
var { LoginPage } = require('./components/LoginPage');
var { Register } = require('./components/Register');
var { Documents } = require('./components/Documents');

/* This can check if your electron app can communicate with your backend */
// fetch('http://localhost:3000')
// .then(resp => resp.text())
// .then(text => console.log(text))
// .catch(err => {throw err})

//DEFAULT HOME IS LOGIN PAGE SINCE '/' ROUTE
const router = (
  <HashRouter>
    <div>
      <Route path='/' exact component={LoginPage} />
      <Route path='/register' exact component={Register} />
      <Route path='/documents' exact component={Documents} />
    </div>
  </HashRouter>
)

ReactDOM.render(router,
   document.getElementById('root'));
