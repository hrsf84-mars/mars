const mongoose = require('mongoose');
require('./index.js');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: String,
  hash: String,
  salt: String
});

userSchema.methods.validPassword = function(pwd) {
  var salt = this.salt;
  var hash = bcrypt.hashSync(pwd, this.salt);

  console.log('salt', salt);
  console.log('this.has', this.hash);
  console.log('hash', hash);
  console.log(this.hash === hash);
  return (this.hash === hash );
};

const User = mongoose.model('User', userSchema);

module.exports = User;