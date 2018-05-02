const path = require('path');
const fs = require('fs');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const indexRoutes = require('./routes/index');
const apiRoutes = require('./routes/apiRoutes');

const app = express();

//app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.set('view engine', 'html');
app.engine('html', function (path, options, callbacks) {
  fs.readFile(path, 'utf-8', callback);
});

app.use(cors({ origin: '*' }));
app.use(express.static(path.join(__dirname, '../client/dist')));

app.use('/api', apiRoutes);
app.use('*', indexRoutes);

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
});

module.exports = app;
