function notFound(req, res) {
  res.setHeader('Content-Type', 'text/html');
  res.statusCode = 404;
  res.statusMessage = `Could not ${req.method} at ${req.url}`;
  res.end(res.statusMessage);
}

module.exports = notFound;