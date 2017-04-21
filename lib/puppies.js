const connect = require('./connect');
const notFound = require('./notFound');
const bodyParser = require('./bodyParser');
const ObjectId = require('mongodb').ObjectId;

function puppies(req, res) {
  const puppies = connect.db.collection('poms');

  if (req.method === 'GET') {

    if (req.params.id) {
      puppies.findOne({ _id: ObjectId(req.params.id) })
      .then(pom => {
        const serialPom = JSON.stringify(pom);
        res.end(serialPom);
      })
      .catch(notFound(req, res));
    }

    puppies.find()
    .toArray()
    .then(poms => {
      const serialPoms = JSON.stringify(poms);
      res.end(serialPoms);
    });
  } else if (req.method === 'POST') {
    bodyParser(req)
    .then(body => JSON.parse(body))
    .then(puppy => {
      return puppies.insert(puppy);
    })
    .then(puppy => {
      res.end(JSON.stringify(puppy.ops[0]));
    });
  }
}

module.exports = puppies;