const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const config = require('../../../config');

let col = config.medCol;

const mediaSchema = new Schema(
  {
    UsageClass: String,
    CheckoutType: String,
    MaterialType: String,
    CheckoutYear: String,
    CheckoutMonth: String,
    Checkouts: String,
    Title: String,
    Creator: String,
    Subjects: String,
    Publisher: String,
    PublicationYear: String,
  }, 
  { collection: `${col}`}
)

// create media model
const Media = mongoose.model(col, mediaSchema);

// export the model
module.exports = Media;