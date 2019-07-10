const readline = require('readline');
const fs = require('fs');
// import the mongo client
const mdbclient = require('mongodb').MongoClient;


// connect to the local db
const url = 'mongodb://localhost:27017/';
const config = require('./config.js');
const filePath = '../testFiles/checkouts-by-title.csv';

// local variables
let rl;
const t0 = new Date().getTime();
let line_no = 0;
const noOfMediaToRead = 50;
const chunkSize = 10;
let chunksTotal = Math.ceil(noOfMediaToRead/chunkSize);
let chunkNo = 0;
let mediaFields = [];
let mediaObj = {};
let mediaBuffer = [];

function parseLine(line) {
	//split csv lines by commas

	let fixedLine = line.replace(/,,/g,',');

	let arr = fixedLine.split(',');

	
	
	// define line limit (to be stored in the DB)
	if (line_no <= noOfMediaToRead) {
		// grabbing field names from the first line in the csv
		if (line_no === 0) {
			// using rest parameter in order to pass the values from arr by value
			mediaFields = [...arr];
			console.log(`mediaFields: ${mediaFields}`);
		} else if (line_no === 1) {
			console.log(`2nd line: ${arr} `);
		} else {
			// construct objects: key = mediaFields ; values = arr[i] 
			for (let i in arr) {
				mediaObj[mediaFields[i]] = arr[i];
			}
			// add object to the buffer
			mediaBuffer.push(mediaObj);
			// clear media object
			mediaObj = {};
			// if buffer reached the chunkSize, pause to insert it to the DB
			if (mediaBuffer.length % chunkSize === 0) {
				rl.pause();
			}
		}
  } else {
		rl.close(); // calls endActions()
	}

	line_no++;
}

function endActions(col, conn) {
  console.log('ending file stream');
	// add remaining chunk, if any
	if (mediaBuffer.length > 0) {
    console.log('echo');
		insertChunk(col, () => {
			conn.close();
    	showEndOfProcStats();
		});
	} else {
		//end server connection
    conn.close();
    showEndOfProcStats();
	}
}

function showEndOfProcStats() {
	let t2 = new Date().getTime();
	console.log('Stopped reading from file');
	console.log(`PROCESS DURATION: ${(t2-t0) / 1000} s `);
}

// col = targetCollection
function insertChunk(col, done) {
  if (mediaBuffer.length > 0) {
		console.log(`chunk:${++chunkNo}; size:${mediaBuffer.length}`);
    col.insertMany(mediaBuffer, (err, res) => {
      if (err) {
        console.error(err);
      }
			done();
    });
  }
}

// connect to the server
mdbclient.connect(url, { useNewUrlParser: true }, (err, conn) => {

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
			
			console.log('\n');
			console.log(`Created a collection named "${config.collection}"` + ` in database "${config.db}"`);

			console.log(`Lines to read: ${noOfMediaToRead}`);
			console.log(`Chunk size: ${chunkSize} lines/chunk`);
			console.log(`Chunks to read: ${chunksTotal}`);

			// read stream for reading file
			rl = readline.createInterface({
				input: fs.createReadStream(filePath)
				//input: fs.createReadStream('test.csv')
			});

      //-------Event listeners--------------------------
			// event: is emitted after each line
			rl.on('line', parseLine);
			// event: read stream closed
			rl.on('close', () => endActions(col, conn));
			// event: read stream paused
      rl.on('pause', () => {
				insertChunk(col, () => {});

				//reset mediaBuffer
				mediaBuffer = [];
		
				// resume reading from file
				rl.resume();
			});
      //------------------------------------------------
		}
	);
});