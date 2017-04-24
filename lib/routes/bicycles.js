const ObjectId = require('mongodb').ObjectId;

const connect = require('../connect');
const notFound = require('./not-found');
const bodyParser = require('../helpers/body-parser');

function bicycles(req, res) {
  const road = connect.db.collection('road');

  if (req.method === 'POST') {
    bodyParser(req)
      .then(body => {
        return road.insert(JSON.parse(body));
      })
      .then(inserted => {
        const serialized = JSON.stringify(inserted.ops[0]);
        res.statusCode = 201;
        res.end(serialized);
      });
  } else {
    //GET request for a specific ID
    if (req.params.id) {
      return road.findOne({ _id: ObjectId(req.params.id) })
        .then(bike => {
          if (!bike) return notFound(req, res);

          const serialized = JSON.stringify(bike);
          res.end(serialized);
        })
        .catch(err => {
          res.end(err);
        });
    } 
    //GET request: return all bicycles
    return road.find(req.query)
      .toArray()
      .then(bikes => {
        const serialized = JSON.stringify(bikes);
        res.end(serialized);
      })
      .catch(err => {
        console.err(err);
      });
  }
}

module.exports = bicycles;