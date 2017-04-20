const parsePath = require('./helpers/parsePath');
const notFound = require('./helpers/notFound');
const puppies = require('./routes/puppies');

const routes = {
  'puppies': puppies,
  '404': notFound
};

function app(req, res) {
  const url = parsePath(req.url) || notFound;
  req.query = url.query;
  req.params = url.params;

  res.setHeader('Content-Type', 'application/JSON');
  const route = routes[url.route];
  route(req, res);
}

module.exports = app;