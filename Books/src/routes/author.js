const Router = require('express').Router;
const AuthorController = require('../controllers/author');
let bookModel = require('../model/book');
var authorRoutes = new Router();

// injecting the book model in the author instance
var authorControllerIns = new AuthorController(bookModel);

authorRoutes.get('/', (req, res) => {
  authorControllerIns.getAuthors((err, docs) => {
    if (err) {
      console.error(err);
      return res.status(500).end();
    }
    res.json(docs);    
  });
});

module.exports = authorRoutes;