function notFound(req, res) {
  res.statusCode = 404;
  res.statusMessage = `CANNOT GET ${req.url}`;
  res.end();
}

module.exports = notFound;