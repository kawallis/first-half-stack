const http = require('http');
const app = require('./lib/app');
const DB_URI = require('mongodb://localhost:27017/puppies');

const connection = require('./lib/helpers/connect');
connection.connect(DB_URI);

const server = http.createServer(app);
const PORT = 3000;

server.listen(PORT, () => {
  //eslint-disable-next-line
  console.log('Server now listening at', server.address());
});