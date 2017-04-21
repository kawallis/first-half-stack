const mongo = require('mongodb').MongoClient; 
const url = 'mongodb://localhost:27017/cinema'

const dbHolder = {
    db: null
};

mongo.connect(url)
    .then(db => {
        console.log('YOUR CONNECTED BOBO');
        dbHolder.db = db 
    })
    .catch(err => {
        console.log('ERROR', err);
    });

module.exports = dbHolder;