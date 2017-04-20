const connect = require('./connect');
const notFound = require('./notfound');
const ObjectId = require('mongodb').ObjectId;

function puppies(req, res) {
  const puppies = connect.db.collection('poms');

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
}

module.exports = puppies;