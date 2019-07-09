const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const config = require('../../config.js');

const mediaSchema = new Schema({
  usageClass: {type: String},
  checkoutType: {type: String},
  materialType: {type: String},
  checkoutYear: {type: String},
  checkoutMonth: {type: String},
  checkouts: {type: String},
  title: {type: String},
  creator: {type: String}
},{ collection: `${config.collection}`})

// create media model
const Media = mongoose.model(config.collection, mediaSchema);

// export the model
module.exports = Media;