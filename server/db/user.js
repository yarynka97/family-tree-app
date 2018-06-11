var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
  },
  firstName:{
    type: String
  },
  lastName:{
    type: String
  },
  trees: {
    type: Array,
    required: false
  }
});

UserSchema.pre('save', function (next) {
  var user = this;
  bcrypt.hash(user.password, 8, function (err, hash) {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  })
});


module.exports = mongoose.model('User', UserSchema);
