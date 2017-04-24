const mongo = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/puppies';

const connect = {
  db: null
};

mongo.connect(url)
.then(db => {
  connect.db = db;
});

module.exports = connect;