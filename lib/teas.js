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
        .then(savedTea => res.send(savedTea))
        .catch(err => console.log(err));
});

app.get('/teas', (req, res) => {
    const _id = new ObjectId(req.params.id);
    connect.db.collection('teasCollection')
        .findOne({ _id })
        .then(tea => {
            if (tea === null)
                res.status(404).send({ error: 'nothing there' });
            else {
                console.log(tea);
                res.send(tea);
            }
        });
});
// teas.find(req.route)
//     .toArray()
//     .then(teas => {
//         const serialTeas = JSON.stringify(teas);
//         res.end(serialTeas);
//     })
//     .catch(err => {
//         res.end(err);
//     });


module.exports = app;