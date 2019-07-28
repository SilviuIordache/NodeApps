const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const config = require('../../../config');

let col = config.pubCol;

const publisherSchema = new Schema(
  {
    publisherName: String,
    publications: String,
    firstYear: String,
    lastYear: String
  },
  { collection: `${col}`}
)

// create the publisher model
const Publisher = mongoose.model(col, publisherSchema);

// export the model
module.exports = Publisher;

