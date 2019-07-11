const fs = require('fs');
const csv = require('csv-parser');
const mdbclient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/';
const config = require('../MediaFlow/config');

const chunk = 10;
const limit = 10;
let curr = 0;
let results = [];
// connect to the server
mdbclient.connect(url, {
  useNewUrlParser: true
}, (err, conn) => {

  //create databse
  var db = conn.db(config.db);

  // create collection
  db.createCollection(
    config.collection,
    (err, col) => {
      if (err) {
        conn.close();
        return console.error(err);
      }
      let stream = fs.createReadStream('./testFiles/checkouts-by-title.csv')
        .pipe(csv())
        .on('data', (data) => {
          if (curr >= limit) {
            console.log('end');
            stream.end();
            return
          }

          // trim extra characters
          data['CheckoutYear'] = data['CheckoutYear'].replace(/\D/g, '');
          data['PublicationYear'] = data['PublicationYear'].replace(/\D/g, '');

          results.push(data)
          curr++;

          if (curr % chunk === 0) {
            if (results) {
              col.insertMany([...results], (err, res) => {
                if (err) console.error(err);
              });
            }
            results = [];
          }
          
        })
        .on('end', () => {
          if (results)
            col.insertMany(results, (err, res) => {
              if (err) {
                console.error(err);
              }
            });
        });
    });
});