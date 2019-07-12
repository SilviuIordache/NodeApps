const fs = require('fs');
const csv = require('csv-parser');
const mdbclient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/';
const config = require('../MediaFlow/config');

let chunkNo = 0;
const chunk = 40000;
const limit = 1000000;
const totalChunks = limit / chunk;

let currentLine = 0;
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
      
      col.createIndex({'$**': 'text'});
      col.createIndex({'Publisher': 1});
      col.createIndex({'Creator': 1});
      col.createIndex({'Author': 1});

      if (err) {
        conn.close();
        return console.error(err);
      }
      let stream = fs.createReadStream('../testFiles/checkouts-by-title.csv')
        .pipe(csv())
        .on('data', (data) => {
          if (currentLine >= limit) {
            console.log('end');
            stream.end();
            return
          }

          // trim extra characters
          data['CheckoutYear'] = data['CheckoutYear'].replace(/\D/g, '');
          data['PublicationYear'] = data['PublicationYear'].replace(/\D/g, '');

          results.push(data)
          currentLine++;


          if (currentLine % chunk === 0) {
            if (results) {
              col.insertMany([...results], (err, res) => {
                if (err) console.error(err);
                chunkNo++;
                console.log(`chunk: ${chunkNo}/${totalChunks}`);
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