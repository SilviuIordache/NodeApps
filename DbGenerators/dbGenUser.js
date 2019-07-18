const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/';
//const config = require('./config');

MongoClient.connect(url, 
  {  useNewUrlParser: true }, 
    (err, client) => {
      if (err) return console.log(err);

      // connect to the db
      const db = client.db('mediaDB');

      //check if db exists
      const collection = db.collection('dogs');
})