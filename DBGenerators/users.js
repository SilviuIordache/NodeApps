const mdbclient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/';
const fs = require('fs');
const config = require('../config/config');
const USERS_FILE = 'users.json';
let users = [];


// connect to the server
mdbclient.connect(url, {
    useNewUrlParser: true
  }, (err, conn) => {
    if (err) throw err;

    //create databse
    var db = conn.db(config.db);

    // create collection
    db.createCollection(
      config.userCol,
      (err, col) => {
        if (err) {
          conn.close();
          return console.error(err);
        }
        // read from file
        fs.readFile(USERS_FILE, 'utf8', (err, data) => {
          if (err) throw err;

          // store data in a local var
          users = JSON.parse(data);
          console.log(users);

          // after reading from file, inser the data in the specified collection
          db.collection(config.userCol).insertMany( users, (err, res) => {
            if (err) throw err;
            conn.close();
          })

        })
      });
  });
