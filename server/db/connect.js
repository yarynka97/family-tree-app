const mongoose = require('mongoose');
const url = require('../../config').db_url;
mongoose.connect(url);
