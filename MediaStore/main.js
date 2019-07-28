const express = require('express');
const bp = require('body-parser');
const mongoose = require('mongoose');
var cors = require('cors');
const path = require('path');

mongoose.set('useFindAndModify', false);

const portNo = 3000;

// import config with media and collection name
const config = require('./config');

// create database connection
const conn = mongoose.connect(
  `mongodb://localhost:27017/${config.db}`, {
    useNewUrlParser: true,
    useCreateIndex: true
  }, 
  () => {
    console.log('DB connection established');

    // establish db connection
    const db = mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function () {
      console.log(`Connected to DB named: ${config.db}`);
    });

    // import routes
    const routes = require('./src/server/routes/main');

    // create express object
    var app = express();

    app.use(cors());
    app.use(bp.urlencoded({ extended: false})) // load json parser
    app.use(bp.json());
    app.use(express.static(path.join(__dirname, 'node_modules')));
    app.use(routes); // load routes

    // serves files from node_modules.
    app.use(express.static(path.join(__dirname, './node_modules'), {
      maxAge: 24 * 60 * 60 * 1000
    }));

    // serve static files from client.
    app.use(express.static(path.join(__dirname, './src/client'), {
      maxAge: 24 * 60 * 60 * 1000
    }));

    app.listen(portNo, () => {
      console.log(`listening on port ${portNo}`);
    });

  });
//mongoose.set('debug', true);

