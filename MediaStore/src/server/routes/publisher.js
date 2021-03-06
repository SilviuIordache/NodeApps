const Router = require('express').Router;
const PublisherController = require('../controllers/publisher');
let publisherModel = require('../model/publisher');
let publisherRoutes = new Router();

// injecting the publisher model in the controller instance
const publisherController = new PublisherController(publisherModel);



publisherRoutes.get('/top', (req, res) => {

  const page = req.query.page || 0;
  const elemPerPage = parseInt(req.query.elemPerPage) || 10;
  const name = req.query.name;

  const ord = req.query.ord;
  let ordParam = (ord === 'asc' ? 1 : -1)

  publisherController.getPublishers(
    page,
    name,
    ordParam,
    elemPerPage, 
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    }
  ) 
})

publisherRoutes.get('/count', (req, res) => {
  publisherController.getPublisherCount( 
    (err, result) => {
      if (err) throw (err)
      res.json(result);
    })
})

module.exports = publisherRoutes;