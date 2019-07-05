const readline = require('readline');
const fs = require('fs');

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create database
mongoose.connect('mongodb://localhost:27017/mediaDB');


let noOfMediaToRead = 30000000;
let mediaBufferSize = 30000;
let mediaBuffer = []; // buffer used to insert data in big batches

// create media schema
let mediaSchema = new Schema({
  type: {type: String, required: true},
  model: {type: String, required: true},
  mediaType: {type: String, required: true},
  year: {type: String, required: true}
});



// create mongoose model
const MediaEntry = mongoose.model('MediaEntry', mediaSchema);

// local variables
let t0 = new Date().getTime();
let line_no = 0;

// each instance is associated with single input stream
let rl = readline.createInterface({
  input: fs.createReadStream('checkouts-by-title.csv')
  //input: fs.createReadStream('test.txt')
});


// TO DO: read only first line of the file
rl.on('line', function (line) {

  let firstLineRead = false;

  //split lines by commas
  let arr = line.split(',');

  // Define line limit (to be stored in the DB)
  if (firstLineRead === false) {
    firstLineRead = true;

    //construct an object from each element in the array
    arr.forEach((el,index) => {
      obj[el] = 0;
    })

  } else { 
    // STOP READING
    rl.close();
  }
});



// event is emitted after each line
rl.on('line', function (line) {
  
  // feedback logs
  if (line_no % 10000 == 0) {
    console.log(`${line_no} lines processed`);
  }
  
  //split lines by commas
  let arr = line.split(',');

  // Define line limit (to be stored in the DB)
  if (line_no <= noOfMediaToRead) {

    //todo 1: construct an object (with scheme) from each line
    let mediaEntry = new MediaEntry({
      type: arr[0],
      model: arr[1],
      mediaType: arr[2],
      year: arr[3]
    })

    // read 25000 lines and save them to the buffer
    if (!(line_no % mediaBufferSize == 0)) {
      mediaBuffer.push(mediaEntry);
    } else {
      // push batch to the DB
      MediaEntry.insertMany(mediaBuffer, () => {
        console.log('inserted 1 batch');
      })

      //empty the buffer
      mediaBuffer = [];
    }

  } else { 
    // STOP READING
    rl.close();
  }

  //increment lines read number
  line_no++;
});


// End of read stream event
rl.on('close', 
  function () {
    console.log('Stopped reading from file');

    // Process duration 
    let t2 = new Date().getTime();
    console.log(`PROCESS DURATION: ${(t2-t0) / 1000} s `);

    // Total lines count
    console.log(`processed lines:  ${line_no}`);

    console.log(obj);
  }
);