const mongoose = require('mongoose');
require('./index.js');

const userSchema = new mongoose.Schema({
  username: string;
  hash: string;
});

const User = mongoose.model('User', userSchema);

module.exports = User;