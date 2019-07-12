const express = require('express');
const bp = require('body-parser');
const mongoose = require('mongoose');
var cors = require('cors')
mongoose.set('useFindAndModify', false);

const portNo = 3000;

// import config with media and collection name
const config = require('./config.js');

// create database connection
mongoose.connect(
  `mongodb://localhost:27017/${config.db}`, {
    useNewUrlParser: true,
    useCreateIndex: true
  });
//mongoose.set('debug', true);

// establish db connection
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log(`DB connection established: ${config.db}`);
});

// import routes
const routes = require('./src/server/routes/main');

// create express object
var app = express();

// use cors
app.use(cors());

// load json parser
app.use(bp.urlencoded({
  extended: false
}))
app.use(bp.json());


// load routes
app.use('/', routes);



app.listen(portNo, () => {
  console.log(`listening on port ${portNo}`);
});