const express = require('express');
const app = express();
const route = require('./routes/routes');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

app.use('/', route);


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Backend server for Electron App running on port 3000!')
})
