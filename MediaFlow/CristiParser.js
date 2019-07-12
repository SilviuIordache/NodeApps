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
let linesValidated = 0;
const noOfMediaToRead = 10;
const chunkSize = 1;
let chunksTotal = Math.ceil(noOfMediaToRead / chunkSize);
let chunkNo = 0;
let mediaFields = [];
let mediaObj = {};
let mediaBuffer = [];

function validateArr(arr) {
	// test for empty arr
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === "" || arr[i] === " ") {
      return false;
    }
	}
  return true;
}

function splitMedia(arr) {
	let newArr = [];

	//save first 6 fields
	const EASY_PARSED = 6;
	for (let i = 0; i < EASY_PARSED; i++) {
		newArr[i] = arr[i];
	}

	// save Publicationyear
	newArr[10] = arr[arr.length -1].replace(/\D/g, '');

	// trim the first 6 and the last elem
	arr.splice(0, 6);
	arr.splice(-1);

	//concat array ( arr -> str)
	let newStr = arr.join(',');

	const HARD_PARSED_START = 6;
	const HARD_PARSED_FINISH = 10;
	let i = HARD_PARSED_START; 
	while (i < HARD_PARSED_FINISH) {
		if (newStr[0] === `"`) {
			let newArrStr = newStr.split(`"`);
			newArr[i++] = newArrStr[1];
			newArrStr.splice(0, 2);
			newStr = newArrStr.join('"');
			arr.splice(0, 1);
		} else {
			if (newStr[0] === `,`) {
				newStr = newStr.substr(1);
				arr.splice(0, 1)
				if (newStr[0] === ',') {
					newStr = newStr.substr(1);
					newArr[i++] = '';
					arr.splice(0, 1)
				}
			} else {
				newArr[i] = arr[0];
			}
			arr.splice(0, 1);			
		}
	}

	return newArr;
}

function parseLine(line) {

	line_no++;
	let arr = line.split(',');
	
	// define line limit (to be stored in the DB)
	if (line_no <= noOfMediaToRead) {
		// grabbing field names from the first line in the csv
		if (line_no === 1) {
			// using rest parameter in order to pass the values from arr by value
			mediaFields = [...arr];
			console.log(`mediaFields: ${mediaFields}`);
		} else {
			arr = splitMedia(arr);

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
	console.log(`lines validated ${linesValidated}/${line_no}`);
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