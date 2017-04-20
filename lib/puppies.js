const connect = require('./connect');

function puppies(req, res) {
  const poms = connect.db.collection('poms');

  poms.find()
  .toArray()
  .then(poms => {
    const serialPoms = JSON.stringify(poms);
    res.end(serialPoms);
  });
}

module.exports = puppies;