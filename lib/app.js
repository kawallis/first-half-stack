const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const ObjectId = require('mongodb').ObjectId;

const connection = require('../lib/connect');

app.use(morgan('dev'));
app.use(bodyParser.json());

app.post('/puppies', (req, res) => {
  connection.db.collection('poms')
    .insert(req.body)
    .then(puppy => puppy.ops[0])
    //console.log 'puppy' if you don't remember why .ops[0]
    .then(savedPuppy => {
      res.send(savedPuppy);
    })
    .catch(err => res.status(404).send(err, 'Poms not found'));
});

app.get('/puppies/:id', (req, res) => {
  const poms = connection.db.collection('poms');
  poms.findOne({ _id: ObjectId(req.params.id) })
    .then(pom => {
      if (pom === null) {
        res.status(404).send('Poms not found');
      }
      res.send(pom);
    });

});

app.get('/puppies', (req, res) => {
  const poms = connection.db.collection('poms');

  poms.find()
    .toArray()
    .then(poms => {
      if (!poms) {
        res.status(404).send('Poms not found');
      }
      res.send(poms);
    });

});

module.exports = app;