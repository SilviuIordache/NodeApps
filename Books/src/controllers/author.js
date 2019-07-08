class AuthorController {
  constructor(bookModel) {
    this.books = bookModel;
  }
  getAuthors(done) {
    this.books.distinct('author', done);
  }
}

module.exports = AuthorController;