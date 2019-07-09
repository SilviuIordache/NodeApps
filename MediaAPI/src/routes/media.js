const Router = require('express').Router;
const MediaController = require('../controllers/media');
let mediaModel = require('../model/media');
var mediaRoutes = new Router();


// injecting the media model in the controller instance
const mediaController = new MediaController(mediaModel);

// mediaRoutes.get('/', (req, res) => {
//   mediaControllerIns.getMedias((err, docs) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).end();
//     }
//     res.json(docs);
//   })
// })

// show first 6 media files
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

// show by id
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

// show by field
mediaRoutes.get('/search/:field', (req, res) => {
  let field = req.params['field'];


  mediaController.getByField(field, function(err, result){
    if(err) return res.status(500).send(JSON.stringify(err));
    return res.status(200).send(result);
  })
})

//show by pages
mediaRoutes.get('/pages/:page', (req, res) => {
  mediaController.getMedia(
    req.params['page'],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).end();
      }
      res.json(result);
    });
})

// adding an item
mediaRoutes.post('/', (req, res) => {
  let item = req.body;

  mediaController.createMedia(item, function(err, result){
    if(err) return res.status(500).send(JSON.stringify(err));
    res.status(201).send(result);
  })
})

// to do:  Delete

// to do:  modify


module.exports = mediaRoutes;