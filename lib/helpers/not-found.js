module.exports = function notFound(req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.statusCode = 404;
    res.statusMessage = `CANNOT ${req.method} ${req.url}`;
    res.end(res.statusMessage);
};

