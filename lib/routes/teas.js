const connect = require('../connect');
const notFound = require('../helpers/not-found');

const ObjectId = require('mongodb').ObjectID;

function teas(req, res) {
    const teas = connect.db.collection('teasCollection');

    if (req.params.id) {
        teas.findOne({ _id: ObjectId(req.params.id) })
            .then(tea => {
                const serialTea = JSON.stringify(tea);
                res.end(serialTea);
            })
            .catch(notFound(req, res));
    }

    teas.find(req.query).toArray()
        .then(teas => {
            if(!teas) notFound();
            const serialTeas = JSON.stringify(teas);
            res.end(serialTeas);
        });
}

module.exports = teas;