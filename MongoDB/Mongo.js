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
const noOfMediaToRead = 250007;
const chunkSize = 25000;
let chunksTotal = Math.ceil(noOfMediaToRead/chunkSize);
let chunkNo = 0;
let mediaFields = [];
let mediaObj = {};
let mediaBuffer = [];

function parseLine(line) {
	//split csv lines by commas
	let arr = line.split(',');

	// define line limit (to be stored in the DB)
	if (line_no <= noOfMediaToRead) {

		// grabbing field names from the first line in the csv
		if (line_no === 0) {
			// using rest parameter in order to pass the values from arr by value
			mediaFields = [...arr];
		} else {
			// construct objects: key = mediaFields ; values = arr[i] 
			for (let i in arr) {
				mediaObj[mediaFields[i]] = arr[i];
			}
			// add object to the buffer
			mediaBuffer.push(mediaObj);

			// clear media object
			mediaObj = {};

			// If buffer reached the chunkSize, pause to insert it to the DB
			if (mediaBuffer.length % chunkSize == 0) {
				rl.pause();
			}
		}
	} else if (mediaBuffer > 0){
		rl.pause();
	} else {
		rl.close();
	}

	line_no++;
}

function endActions(col, conn) {

	console.log(mediaBuffer.length);

	// add remaining chunk, if any
	if (mediaBuffer.length > 0) {
		//console.log('echo');
		insertChunk(col, buff);

		// col.insertMany(mediaBuffer, (err, res) => {
		// 	if (err) {
		// 		console.error(err);
		// 	}
		// 	console.log(`chunk: ${chunkNo} / ${chunksTotal}`);

		// 	//end server connection
		// 	conn.close();

			
		// });
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

// col = targetCollection, buff = targetBuffer
function insertChunk(col, buff) {
	col.insertMany(buff, (err, res) => {
		if (err) {
			console.error(err);
		}
		console.log(`chunk:${chunkNo}/${chunksTotal}`);
		chunkNo++;
	});
}

function addChunk(collection) {
	// insert datapoints in collection
	// collection.insertMany(mediaBuffer, (err, res) => {
	// 	if (err) {
	// 		console.error(err);
	// 	}
	// 	console.log(`chunk: ${chunkNo} / ${chunksTotal}`);
	// 	chunkNo++;
	// });

	insertChunk(collection, mediaBuffer);
	
	// reset buffer
	mediaBuffer = [];

	// resume reading from file
	rl.resume();
}

// connect to the server
mdbclient.connect(url, (err, conn) => {

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

			// Event: is emitted after each line
			rl.on('line', parseLine);

			// Event: read stream closed
			rl.on('close', () => endActions(col, conn));

			// Event: read stream paused
			rl.on('pause', () => addChunk(col));
		}
	);
});