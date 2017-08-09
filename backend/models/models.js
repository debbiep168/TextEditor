var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  documents: [
    {
      type: Schema.ObjectId,
      ref: 'Document'
    }
  ]
});

var documentSchema = new Schema({
  owner: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  title: {
    type: String,
    required: true
  },
  text: {
    type: String
  },
});

var User = mongoose.model('User', userSchema)
var Document = mongoose.model('Document', documentSchema)

module.exports = {
  User: User,
  Document: Document
};
