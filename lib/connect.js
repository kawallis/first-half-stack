const mongo = require('mongodb').MongoClient;
const DB_URI = 'mongodb://localhost:27017/teas';

const connect = {
    db: null
};

mongo.connect(DB_URI) 
    .then(db => {
        connect.db = db;
    })
    .catch(err => {
        console.log('MONGO ERROR', err);
    });

module.exports = connect;
