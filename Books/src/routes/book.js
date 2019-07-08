const Router = require('express').Router;
const BookController = require('../controllers/book');
let bookModel = require('../model/book');
var bookRoutes = new Router();

// injecting the book model in the controller instance
var bookControllerIns = new BookController(bookModel);

bookRoutes.get('/', (req, res) => {
  bookControllerIns.getBooks((err, docs) => {
    if (err) {
      console.error(err);
      return res.status(500).end();
    }
    res.json(docs);
  });
});


bookRoutes.post('/', (req, res) => {
  bookControllerIns.addBook(req.body, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).end();
    }
    console.log(result);
    res.status(201).end();
  });
});

bookRoutes.delete('/:isbn', (req, res) => {
  bookControllerIns.deleteBook(req.params.isbn, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).end();
    }
    res.status(204).end();
  });
});

module.exports = bookRoutes;