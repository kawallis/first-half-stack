const http = require('http');
const app = require('./lib/teas');
const DB_URI = 'mongodb://localhost:27017/teasCollection';

const connection = require('./lib/connect');
connection.connect(DB_URI);

const server = http.createServer(app);
const PORT = 3000;

server.listen(PORT, () => {
    console.log(`Server now listening at ${PORT}`);
});

// jasd