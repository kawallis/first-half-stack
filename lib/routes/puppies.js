const connect = require('../helpers/connect');
const notFound = require('../helpers/notFound');
const ObjectId = require('mongodb').ObjectId;

function puppies(req, res) {
  const poms = connect.db.collection('poms');

  if (req.params.id) {
    poms.findOne({ _id: ObjectId(req.params.id) })
    .then(pom => {
      const serialPom = JSON.stringify(pom);
      res.end(serialPom);
    })
    .catch(notFound(req, res));
  }
  poms.find()
    .toArray()
    .then(poms => {
      const serialPoms = JSON.stringify(poms);
      res.end(serialPoms);
    });
}

module.exports = puppies;