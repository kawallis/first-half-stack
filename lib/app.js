const express = require('express');
const app = express();
const morgan = require('morgan');
const ObjectId = require('mongodb').ObjectID; 
const bodyParser = require('body-parser');

const connection = require('./connect');

app.use(bodyParser.json());
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send('Checkout These Unicorns Foolio');
});

app.get('/unicorns', (req, res) => {
  connection.db.collection('unicorns').find()
  .toArray()
  .then(unicorns => {
    const unpackedUni = JSON.stringify(unicorns);
    res.end(unpackedUni);
  });  
});

app.get('/unicorns/:id', (req, res) => {
  const searchId = req.params.id;
  connection.db.collection('unicorns')
  .findOne(ObjectId(searchId)) 
  .then(unicorn => {
    if(!unicorn) {
      res.status(404).send({error: 'resource not found'});
    } else {
      const unpackedUni = JSON.stringify(unicorn);
      res.send(unpackedUni);
    }
  });
});

app.post('/unicorns', (req, res) => {
  connection.db.collection('unicorns')
  .insert(req.body)
  .then(response => {
    return response.ops[0];
  })
    .then(savedUnicorn => res.send(savedUnicorn))
    .catch(err => console.log(err));
});
module.exports = app;