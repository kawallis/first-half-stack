const connect = require('../connect');

function teas(req, res) {
    const teas = connect.db.collection('teasCollection');

    teas.find()
        .toArray()
        .then(teas => {
            const serialTeas = JSON.stringify(teas);
            res.end(serialTeas);
        });
}

module.exports = teas;