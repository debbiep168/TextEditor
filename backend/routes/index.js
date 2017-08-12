const express = require('express');
var session = require('express-session');
const router = express.Router();
const bodyParser = require('body-parser');
const { User, Document } = require('../models/models');


module.exports = function(passport) {
  router.get('/alldocuments', function(req, res) {
    console.log('req', req.user)
    var userId = req.user._id;
    User.findOne({_id: userId})
      .populate('documents')
      .exec(function(err, usr) {
        console.log('gotuser', usr);
        res.json({documents: usr.documents})
      })
  });

  router.post('/newdocument', function(req, res) {
    var newDocument = new Document ({
      title: req.body.title,
      owner: req.user._id
    })
    newDocument.save()
      .then((doc) => {
        User.findOne({_id: req.user._id})
          .populate('documents')
          .exec(function(err, usr) {
            console.log('userrrrr', usr)
            usr.documents.push(newDocument);
            usr.save()
              .then((usr) => {
                res.json({success: true, documents: usr.documents});
              })
          })
      })
  });

  router.post('/savedocument', function (req, res) {
    var textInput = JSON.stringify(req.body.text);
    var docId = req.body.docId;
    Document.findOne({_id: docId})
      .then((doc) => {
        doc.text = textInput;
        doc.save()
        .then((doc) => {
          console.log(doc)
          res.json({document: doc})
        })
      })
  });

  router.get('/document/:id', function(req, res) {
    var docId = req.params.id;
    Document.findOne({_id: docId})
      .then((doc) => {
        res.json({document: doc});
      })
  });

  return router;
}
