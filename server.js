const app = require('./lib/app');
const http = require('http');
const DB_URI = 'mongodb://localhost:27017/cinema'; 
const PORT = 3000; 

const connection = require('./lib/connect');
connection.connect(DB_URI);

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log('Serving the fools on port de:', PORT);
});