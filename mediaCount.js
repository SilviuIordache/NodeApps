const readline = require('readline');
const fs = require('fs');
const util = require('util');

let t0 = new Date().getTime();
let line_no = 0;
let mediaCount = {}

// create instance of readline
// each instance is associated with single input stream
let rl = readline.createInterface({
  //input: fs.createReadStream('checkouts-by-title.csv')
  input: fs.createReadStream('test.txt')
});

//Counts occurences of an object's keys inside an array and stores them to the corresponding key;
let countOccurences = (arr, countObj) => {

  // regex to trim the extra " and ' characters
  mediaName = arr[2].replace(/("|')/g, "");

  // Dynamically fill the countObj with keys as we find them
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
  line_no++;

  if (line_no % 500000 == 0) {
    console.log(`${line_no} lines processed`);
  }
  
  //split lines by commas
  let arr = line.split(',');
  
  // add occurences from each line (in the array format)
  countOccurences(arr, mediaCount);
});



// End of read stream event
rl.on('close', 
  function (line) {
    
    // Show results
    console.log(mediaCount);

    // Write the json object in a file
    writeObjToFile(mediaCount, 'mediaCount.json');

    // Process duration 
    let t1 = new Date().getTime();
    console.log(`PROCESS DURATION: ${(t1-t0) / 1000} s `);

    // Total lines count
    console.log(`Lines total : ${line_no}`);
  }
);


// Function that writes an object to a file
let writeObjToFile = (obj, fileName) =>{
  let stringifiedObj = util.inspect(obj);

  fs.writeFile(
    `./${fileName}`,
    stringifiedObj,
    err => {
      if (err) throw err;
      console.log(`data written to: ${fileName}`);
    }
  );
}


