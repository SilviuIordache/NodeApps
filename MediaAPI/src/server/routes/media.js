const Router = require('express').Router;
const MediaController = require('../controllers/media');
let mediaModel = require('../model/media');
var mediaRoutes = new Router();


// injecting the media model in the controller instance
const mediaController = new MediaController(mediaModel);


// show first 6 media files (done)
mediaRoutes.get('/test', (req, res) => {
  //console.log(req.params['id']);
  mediaController.getSomeMedia((err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).end();
    }
    res.json(result);
  })
})

// show by field (done) ex: // http://localhost:3000/media/search?field=Dragnea&page=0
mediaRoutes.get('/search', (req, res) => {
  let field = req.query['field'];
  let page = req.query['page'];

  if (page === undefined) page = 0;
  mediaController.getMediaByField(page, field, (err, result) => {
    if(err) return res.status(500).send(JSON.stringify(err));
    res.json(result);
  })
})

//show by pages (done) TO DO : query params
mediaRoutes.get('/page/:page', (req, res) => {

  const page = req.params.page;

  mediaController.getMediaByPage(
    page,
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
  //console.log(`Got this: ${req.params['id']}. type: ${typeof req.params['id']}`);
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

// query by publisher
mediaRoutes.get('/', (req, res) => {
  let publisher = req.query['publisher'];
  let page = req.query['page'];

  mediaController.getMediaByPublisher(page, publisher, (err, result) => {
    if(err) return res.status(500).send(JSON.stringify(err));
    //res.json(result);
    res.status(200).send(result);
  })
})


module.exports = mediaRoutes;