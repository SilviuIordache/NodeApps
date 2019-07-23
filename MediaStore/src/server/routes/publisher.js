const Router = require('express').Router;
const PublisherController = require('../controllers/publisher');
let mediaModel = require('../model/media');
let publisherRoutes = new Router();

// injecting the publisher model in the controller instance
const publisherController = new PublisherController(mediaModel);


publisherRoutes.get('/', (req, res) => {
  publisherController.get(
    req.query.name,
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).end();
      }
      res.json(result);
    })
});

publisherRoutes.get('/top', (req, res) => {
  const pubNo = req.query.limit || 10;

  publisherController.getTopPublishers(
    pubNo, 
    (err, result) => {
      if (err) throw err;
      res.json(result);
    }
  ) 
})

module.exports = publisherRoutes;