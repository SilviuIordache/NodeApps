const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    isbn: { type: String, required: true, unique: true },
    author: { type: String, required: true },
    name: { type: String, required: true },
    date: { type: Date, default: Date.now },
    pages: Number,
    tags: [String]
  });
  
// create book model
const Book = mongoose.model('Book', bookSchema);

// export the model
module.exports = Book;