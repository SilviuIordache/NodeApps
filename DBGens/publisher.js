const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const config = require('../MediaStore/config');

let col = 'media';

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
  { collection: `${col}`}
)

// creating the model
const Publisher = mongoose.model(col, mediaSchema);

// Connecting to the MongoDB
let conn = mongoose.connect(
  `mongodb://localhost:27017/${config.db}`, 
  { useNewUrlParser: true,  useCreateIndex: true },
  () => { console.log(`connected`) }
)


let pipelineStage = [
  { $match: {'Publisher': {$ne : "-"}}},
  { $group: {
      _id: '$Publisher',
      publisherName: { $first: '$Publisher' },
      publications:   { $sum: 1 },
      firstYear: { $min: { $cond: [ 
                                  { $eq: ["$PublicationYear", "-"] },
                                  '9999',
                                  '$PublicationYear'] } },
      lastYear: { $max: '$PublicationYear'}
    },
  },
  { $sort: { publications: -1 } },
  { $out: 'publishers'}
]

Publisher
  .aggregate(pipelineStage)
  .exec((err, res) => {
    if (err) throw(err);
    conn.close();
  });