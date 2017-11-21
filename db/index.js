const mongoose = require('mongoose');

const dbUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/CMDB';
mongoose.Promise = global.Promise;
const db = mongoose.connect(dbUri, {
  useMongoClient: true
});

module.exports = db;
