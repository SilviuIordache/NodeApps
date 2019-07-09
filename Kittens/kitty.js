// getting-started.js
var mongoose = require('mongoose');

const dbName = 'catsDB';
const colName = 'catsCol';

// create and connect to the db
mongoose.connect(`mongodb://localhost/${dbName}`, {
  useNewUrlParser: true
});


//establish db connection
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('db connection established');
});

var kittySchema = new mongoose.Schema({
  name: String
}, { collection: `${colName}`});
//
var Kitten = mongoose.model('Kitten', kittySchema);

var silence = new Kitten({
  name: 'Silence'
});
console.log(silence.name); // 'Silence'

var fluffy = new Kitten({
  name: 'Fluffy'
});


// save models instance to db---------------
silence.save(function (err, fluffy) {
  if (err) return console.error(err);
});

fluffy.save(function (err, fluffy) {
  if (err) return console.error(err);
});
//------------------------------------------

// Kitten.find( (err, kittens) => {
//   if (err) return console.error(err);
//   console.log(`retrieved the following cats ${kittens}`);
// })

Kitten.find({ name: 'Silence'}, 
 (err, docs) => {
  if (err) return console.log(err);
  console.log(`found ${docs}`);
})