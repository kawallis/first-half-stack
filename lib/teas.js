const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const ObjectId = require('mongodb').ObjectID;

const connect = require('./connect');

app.use(bodyParser.json());
app.use(morgan('dev'));

app.post('/teas', (req, res) => {
    connect.db.collection('teasCollection')
        .insert(req.body)
        .then(mongoResponse => {
            return mongoResponse.ops[0];
        })
        .then(savedTea => {
            res.send(savedTea);
        })
        .catch(err => console.log(err));
});

app.get('/teas/:id', (req, res) => {
    const _id = new ObjectId(req.params.id);
    connect.db.collection('teasCollection')
        .findOne({ _id })
        .then(tea => {
            if (!tea)
                res.status(404).send({ error: 'nothing there' });
            else {
                res.send(tea);
            }
        });
});

app.get('/teas', (req, res) => {
    connect.db.collection('teasCollection')
        .find()
        .toArray()
        .then(teas => { 
            if (!teas)
                res.status(404).send({ error: 'nothing there' });
            else {
                res.send(teas);
            }
        });
});


module.exports = app;