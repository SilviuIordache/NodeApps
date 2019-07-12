const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const config = require('../../../config.js');

const col = config.collection;
const db = config.db;

const mediaSchema = new Schema({
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
{ collection: `${col}`})

// mediaSchema.index({'Publisher': 1, 'Creator': 1, 'CheckoutType': 1})

// db.col.createIndex(
//     {Creator: 1, Publisher: 1, MaterialType: 1},
// );



// create media model
const Media = mongoose.model(col, mediaSchema);

// export the model
module.exports = Media;