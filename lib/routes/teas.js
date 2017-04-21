const connect = require('../connect');
const notFound = require('../helpers/not-found');
const bodyParser = require('../helpers/body-parser');

const ObjectId = require('mongodb').ObjectID;

function teas(req, res) {
    const teas = connect.db.collection('teasCollection');

    if (req.method === 'POST') {
        bodyParser(req)
            .then(body => JSON.parse(body))
            .then(tea => teas.insert(tea))
            .then(tea => {
                res.end(JSON.stringify(tea.ops[0]));
            })
            .catch(() => {
                res.statusCode = 500;
                res.end();
            });
    } else if (req.method === 'GET') {

        if (req.params.id) {
            teas.findOne({ _id: ObjectId(req.params.id) })
                .then(tea => {
                    if (tea === null)
                        res.end(notFound(req, res));
                    const serialTea = JSON.stringify(tea);
                    res.end(serialTea);
                });
        }
        teas.find(req.route)
            .toArray()
            .then(teas => {
                const serialTeas = JSON.stringify(teas);
                res.end(serialTeas);
            })
            .catch(err => {
                res.end(err);
            });
    }
}

module.exports = teas;