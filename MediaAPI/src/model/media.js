const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const config = require('../../config.js');

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
{ collection: `${config.collection}`})



// create media model
const Media = mongoose.model(config.collection, mediaSchema);

// export the model
module.exports = Media;