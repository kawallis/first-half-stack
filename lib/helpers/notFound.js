module.exports = function notFound(req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.statusCode = 404;
    const message = `NOT FOUND`;
    res.end(message);
};