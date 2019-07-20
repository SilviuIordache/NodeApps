const fs = require('fs');
const csv = require('csv-parser');
const mdbclient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/';
const config = require('../config/config');

let chunkNo = 0;
const chunk = 10000;
const limit = 50013;
const totalChunks = Math.ceil(limit / chunk);

let currentLine = 0;
let results = [];

function markIfEmpty(str) {
  if (str === '')
    return '-';
  else return str
}
// connect to the server
mdbclient.connect(url, {
  useNewUrlParser: true
}, (err, conn) => {
  if (err) throw err;

  //create databse
  var db = conn.db(config.db);

  // create collection
  db.createCollection(
    config.medCol,
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
            return stream.end();
          }

          // trim extra characters
          data['CheckoutYear'] = data['CheckoutYear'].replace(/\D/g, '');
          data['PublicationYear'] = data['PublicationYear'].replace(/\D/g, '');
          //data['Title'] = trimTitle(data['Title']);

          // check all fields for empty '' string and replace with - if so
          for (key in data) {
            data[key] = markIfEmpty(data[key]);
          }

          results.push(data)
          currentLine++;


          if (currentLine % chunk === 0) {
            if (results.length > 0) {
              col.insertMany(results, (err, res) => {
                if (err) console.error(err);
                chunkNo++;
                console.log(`chunk: ${chunkNo}/${totalChunks}`);
              });
            }
            results = [];
          }
          
        })
        .on('end', () => {
          if (results.length > 0) {
            col.insertMany(results, (err, res) => {
              if (err) console.error(err);
              chunkNo++;
              console.log(`final chunk: ${chunkNo}/${totalChunks}`);
              conn.close();
            });
          }
          results = [];
          conn.close();
        });
    });
});