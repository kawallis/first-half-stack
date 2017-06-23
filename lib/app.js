const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(morgan('dev'));

const unicorns = require('./routes/unicorns');

app.use('/unicorns', unicorns);

module.exports = app;