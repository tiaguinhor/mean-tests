const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('./config/database');
const routesUsers = require('./routes/users');

const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello world!');
});

app.use('/users', routesUsers);

module.exports = app;
