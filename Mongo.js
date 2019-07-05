const readline = require('readline');
const fs = require('fs');

// import the mongo client
const mdbclient = require('mongodb').MongoClient;

// connect to the local db
const url = 'mongodb://localhost:27017/';
const config = require('./config.js');

// local variables
let rl;
const t0 = new Date().getTime();
let line_no = 0;
const noOfMediaToRead = 31000007;
const chunkSize = 25000;
let chunkNo = 0;
let mediaFields = [];
let mediaObj = {};
let mediaBuffer = [];

function parseLine(line) {
	// feedback logs
	// if (line_no % 10000 == 0 && line_no !== 0) 
	// 	console.log(`${line_no} lines processed`);

	//split csv lines by commas
	let arr = line.split(',');

	// define line limit (to be stored in the DB)
	//if (line_no <= noOfMediaToRead) {

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

			// clear object
			mediaObj = {};

			// If buffer reached the chunkSize, pause to insert it to the DB
			if (mediaBuffer.length % chunkSize == 0) {
				rl.pause();
			}
		}
	//} else {
		//rl.close();
	//}

	line_no++;
}

function endActions(col, conn) {
	// add remaining 
	if (mediaBuffer.length > 0) {
		col.insertMany(mediaBuffer, (err, res) => {
			if (err) {
				console.error(err);
			}
			console.log(`added last ${mediaBuffer.length} lines`);
			console.log(`added chunk: ${chunkNo}`);

			let t2 = new Date().getTime();
			console.log('Stopped reading from file');
			console.log(`PROCESS DURATION: ${(t2-t0) / 1000} s `);
			console.log(`processed lines:  ${line_no}`);

			
			//end server connection
			conn.close();
		});
	} else {
		//end server connection
		conn.close();
	}
	
}

function addChunk(collection) {
	// insert datapoints in collection
	collection.insertMany(mediaBuffer, (err, res) => {
		if (err) {
			console.error(err);
		}
		console.log(`added chunk: ${chunkNo}`);
		chunkNo++;
	});

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
			console.log(`\n Created a collection named ${config.collection}` + ` in database ${config.db}`);


			// read stream for reading file
			rl = readline.createInterface({
				input: fs.createReadStream('checkouts-by-title.csv')
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