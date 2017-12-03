const mongoose = require('mongoose');
require('./index.js');

//a table with username, movie1, movie2
const savedSchema = new mongoose.Schema({
  username: String,
  firstMovie: String,
  secondMovie: String,
  image1: String,
  image2: String,
  tmdbid1: Number,
  tmdbid2: Number
});

savedSchema.index({ username: 1, firstMovie: 1, secondMovie:1}, { unique: true });

const SavedMovies = mongoose.model('SavedMovies', savedSchema);

module.exports = SavedMovies;