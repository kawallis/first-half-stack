const connect = require('./connect');
const ObjectId = require('mongodb').ObjectId;

function puppies(req, res) {
  const puppies = connect.db.collection('poms');

if(req.params.id) {
  poms.findOne({ _id: ObjectId(req.params.id) })
  .then(pom => {
    const serialPom = JSON.stringify(pom);
    res.end(serialPom);
  });
}
  poms.find()
  .toArray()
  .then(poms => {
    const serialPoms = JSON.stringify(poms);
    res.end(serialPoms);
  });
}

module.exports = puppies;