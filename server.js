const http = require('http');
const app = require('./lib/app');

const server = http.createServer(app);
const PORT = 3000;

server.listen(PORT, () => {
    console.log('SERVING THE people ON PORT ' + PORT);
});