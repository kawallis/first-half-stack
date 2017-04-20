const connect = require('../connect');
const ObjectId = require('mongodb').ObjectID;

function teas(req, res) {
    const teas = connect.db.collection('teasCollection');

    if (req.params.id) {
        teas.findOne({ _id: ObjectId(req.params.id) })
            .then(tea => {
                const serialTea = JSON.stringify(tea);
                res.end(serialTea);
            });
    }

    teas.find(req.query).toArray()
        .then(teas => {
            const serialTeas = JSON.stringify(teas);
            res.end(serialTeas);
        });
}

module.exports = teas;