const express = require('express');
const bodyParser = require('body-parser');
const route = express.Router();
const models = require('../models/models');
const User = models.User;


app.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login' 
}));

route.post('/register', function(req, res) {
  var newUser = new User({
    username: req.body.username,
    password: req.body.password,
    documents: []
  });
  newUser.save()
    .then((err, newUser) => {
      res.json({success: true});
    });
});






module.exports = route;
