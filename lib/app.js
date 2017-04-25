const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const teas = require('./routes/teas');

app.use(bodyParser.json());
app.use(morgan('dev'));

const routes = {
    'teas': teas
};

// function app(req, res) {
//     const url = parsePath(req.url) || notFound;
//     req.query = url.query;
//     req.params = url.params;

//     res.setHeader('Content-Type', 'application/json');
//     const route = routes[url.route] || notFound;
//     route(req, res);
// }

module.exports = app;