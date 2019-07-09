const Router = require('express').Router;
const MediaController = require('../controllers/media');
let mediaModel = require('../model/media');
var mediaRoutes = new Router();
const config = require('../../config.js');


// injecting the media model in the controller instance
const mediaControllerIns = new MediaController(mediaModel);

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
mediaRoutes.get('/media', (req, res) => {
  //console.log(req.params['id']);
  mediaControllerIns.getSomeMedia((err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).end();
    }
    res.json(result);
  })
})


// to do: show by id
mediaRoutes.get('/media/:id', (req, res) => {
  //console.log(`Got this: ${req.params['id']}. type: ${typeof req.params['id']}`);
  mediaControllerIns.getMediaById(
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


// to do: show by pages (use skip, 1-20, 21-40, etc.)
mediaRoutes.get('/media/pages/:page', (req, res) => {
  config.itemsPerPage,
  req.params['page'],
  mediaControllerIns.getMedia(
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).end();
      }
      res.json(result);
    }
  )
})


//to do:  Delete

//to do:  modify


module.exports = mediaRoutes;