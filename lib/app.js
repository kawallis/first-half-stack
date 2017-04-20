const parsePath = require('./parsePath'); 
const puppies = require('./puppies');
const routes = {
  'puppies': puppies
};

function app(req, res) {
  const url = parsePath(req.url);
  req.query = url.query;

  res.setHeader('Content Type', 'text/html');
  const route = routes[url.route];
  route(req, res);
}

module.exports = app;