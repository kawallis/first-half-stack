const parseUrl = require('url').parse;

const bicycles = require('./routes/bicycles');
const notFound = require('./routes/not-found');

const routes = { 'bicycles': bicycles };

function app(req, res) {
  const url = parseUrl(req.url, true); 
  const splitUrl = url.pathname.slice(1).split('/');
  const path = splitUrl[0];
  const id = splitUrl[1];
  const route = routes[path] || notFound;

  res.setHeader('Content-Type', 'application/json');
  req.query = url.query;
  req.params = { id };
  route(req, res);
}

module.exports = app;