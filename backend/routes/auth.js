const express = require('express');
var session = require('express-session');
const router = express.Router();
const bodyParser = require('body-parser');
const { User } = require('../models/models');
var passport = require('passport');

module.exports = function(passport) {

  router.get('/', function(req, res) {
    res.send('testing');
  })

  router.post('/login', passport.authenticate('local'), function(req, res) {
    res.json({ success: true, user: req.user });
  });

  router.post('/register', function(req, res) {
    var newUser = new User({
      username: req.body.username,
      password: req.body.password,
      documents: []
    });
    newUser.save()
    .then((usr) => {
      res.json({user: usr});
    })
  });

  router.get('/logout', function(req, res) {
    req.logout();
    res.json({success: true});
  });


  return router;
};
