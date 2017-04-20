const parsePath = require('./parsePath'); 
const puppies = require('./puppies');
const notFound = require('./notFound');

const routes = {
  'puppies': puppies,
  '404': notFound
};

function app(req, res) {
  const url = parsePath(req.url);
  req.query = url.query;
  req.params = url.params;

  res.setHeader('Content-Type', 'application/JSON');
  const route = routes[url.route];
  route(req, res);
}

module.exports = app;