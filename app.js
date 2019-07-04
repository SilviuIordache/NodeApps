const readline = require('readline');
const fs = require('fs');

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create database
mongoose.connect('mongodb://localhost:27017/mediaDB');
mongoose.set('debug', true);


// create media schema
let mediaSchema = new Schema({
  type: {type: String, required: true},
  model: {type: String, required: true},
  mediaType: {type: String, required: true},
  year: {type: String, required: true}
});
// create media model
const MediaEntry = mongoose.model('MediaEntry', mediaSchema);


// local variables
let t0 = new Date().getTime();
let line_no = 0;
let mediaCount = {}

// create instance of readline
// each instance is associated with single input stream
let rl = readline.createInterface({
  input: fs.createReadStream('checkouts-by-title.csv')
  //input: fs.createReadStream('test.txt')
});


//Counts occurences of an object's keys inside an array and stores them to the corresponding key;
let countOccurences = (arr, countObj) => {
  // regex to trim the extra " and ' characters
  mediaName = arr[2].replace(/("|')/g, "");
  // dynamically fill the countObj with keys as we find them
  if (countObj.hasOwnProperty(mediaName)) {
    //if the key exists, we increment it
    countObj[mediaName]++;
  } else { 
    //otherwise we add the new key to the obj with value 1
    countObj[mediaName] = 1;
  }
}


// event is emitted after each line
rl.on('line', function (line) {
  
  if (line_no % 10000 == 0) {
    console.log(`${line_no} lines processed`);
  }
  
  //split lines by commas
  let arr = line.split(',');

  if (line_no <= 1000) {
    //todo 1: construct an object (with scheme) from each line
    let mediaEntry = new MediaEntry({
      type: arr[0],
      model: arr[1],
      mediaType: arr[2],
      year: arr[3]
    })

    //todo 2: push it to the mongoDB
    mediaEntry.save((err, res) => {
      if (err)
        return console.error(err);
      //console.log(res);
      // closing the db connection
      // mongoose.disconnect((err) => {
      //   if (err)
      //     return console.error(err);
      //   console.log('Disconnected from mongodb.');
      // });
    });
  } else { // stop reading from stream after line limit
    
    console.log('File reading stream terminated');
    // Process duration 
    let t2 = new Date().getTime();
    console.log(`PROCESS DURATION: ${(t2-t0) / 1000} s `);

    rl.close();
  }

  //increment lines read number
  line_no++;
  
  
  // add occurences from each line (in the array format)
  countOccurences(arr, mediaCount);
});



// End of read stream event
rl.on('close', 
  function (line) {

    // Process duration 
    let t1 = new Date().getTime();
    console.log(`PROCESS DURATION: ${(t1-t0) / 1000} s `);

    // Total lines count
    console.log(`Lines total : ${line_no}`);
  }
);