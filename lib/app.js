const parsePath = require('./helpers/parse-path');
const notFound = require('./helpers/not-found');
const teas = require('./routes/teas');

const routes = {
    'teas': teas
};

function app(req, res) {
    const url = parsePath(req.url) || notFound;
    req.query = url.query;
    req.params = url.params;

    res.setHeader('Content-Type', 'application/json');
    const route = routes[url.route] || notFound;
    route(req, res);
}

module.exports = app;