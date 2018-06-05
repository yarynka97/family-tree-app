const path = require('path');
const fs = require('fs');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const indexRoutes = require('./routes/index');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const treeRoutes = require('./routes/trees');

const app = express();
const db = require('./db/connect');

//app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.set('view engine', 'html');
app.engine('html', function (path, options, callbacks) {
  fs.readFile(path, 'utf-8', callback);
});

app.use(cors({ origin: '*' }));
app.use(express.static(path.join(__dirname, '../client/dist')));

app.use('/api/', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/tree', treeRoutes);
app.use('*', indexRoutes);

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
});

module.exports = app;
