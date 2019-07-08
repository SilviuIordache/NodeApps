class BookController {
  constructor(bookModel) {
    this.books = bookModel;
  }

  getBooks(done) {
    this.books.find({}, done);
  }

  addBook(book, done) {
    let bookIns = new this.books(book);
    bookIns.save(done);
  }

  deleteBook(isbn, done) {
    // create the query by searching for the book and remove it
    // then execute the query
    this.books.find({isbn: isbn}).remove()
    .exec(done);
  }
}

module.exports = BookController;