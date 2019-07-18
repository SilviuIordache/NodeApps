const Router = require('express').Router;
const MediaController = require('../controllers/media');
let mediaModel = require('../model/media');
var mediaRoutes = new Router();


// injecting the media model in the controller instance
const mediaController = new MediaController(mediaModel);


// Search query (with optional name)
mediaRoutes.get('/', (req, res) => {
  const elemsPerPage = 10;
  const page = req.query.page || 0;
  const name = req.query.name;
  const ord = req.query.ord;
  const elemPerPage = parseInt(req.query['elemPerPage']) || elemsPerPage;
  let ordParam = (ord === 'asc' ? 1 : -1)

  mediaController.getMedia(
    page,
    name,
    ordParam,
    elemPerPage,
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).end();
      }
      res.json(result);
    });
})

// show by id (done)
mediaRoutes.get('/:id', (req, res) => {
  mediaController.getMediaById(
    req.params['id'],
    (err, result) => {
      if (err) {
        return console.log(err);
        //return res.status(500).end();
      }
      res.json(result);
    }
  )
})

// adding an item (done)
mediaRoutes.post('/', (req, res) => {
  let item = req.body;

  mediaController.createMedia(item, (err, result) => {
    if (err) return res.status(500).send(JSON.stringify(err));
    res.status(201).send(result);
  })
})

// delete request (done)
mediaRoutes.delete('/:id', (req, res) => {
  let id = req.params['id'];

  mediaController.deleteMediaById(id, (err, result) => {
    if (err) return res.status(500).send(JSON.stringify(err));
    res.status(204).send(result);
  })
  
})

// edit request (done?)
mediaRoutes.put('/', (req, res) => {
  let id = req.query['id'];
  let newValues = req.body;

  mediaController.editMediaItem(id, newValues, (err, result) => {
    if (err) return res.status(500).send(JSON.stringify(err));
    res.json(result);
  });
})

module.exports = mediaRoutes;