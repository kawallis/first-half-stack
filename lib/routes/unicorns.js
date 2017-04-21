const connect = require('../connect');
const bodyParser = require('../helpers/bodyParser');
const ObjectId = require('mongodb').ObjectId;

function unicorns(req, res) {
    const unicorns = connect.db.collection('unicorns');
    if (req.method === 'GET' && req.params.id){    
        unicorns.findOne({_id: ObjectId(req.params.id)})
        .then(unicorn => {
            const unpackedUnicorn = JSON.stringify(unicorn);
            res.end(unpackedUnicorn);
        });   
    } else if (req.method === 'GET'){
         unicorns.find()
        .toArray()
        .then(unicorns => {
            const unpackedUni = JSON.stringify(unicorns);
            res.end(unpackedUni);
        })
    } else if (req.method === 'POST'){
        bodyParser(req)
        .then(body => {
            return JSON.parse(body);
        })
        .then(unicorn => {
            return unicorns.insert(unicorn);
        })
        .then(unicorn => {
            const packedUni = JSON.stringify(unicorn.ops[0]);
            res.end(packedUni);
        })
    }
}

module.exports = unicorns;