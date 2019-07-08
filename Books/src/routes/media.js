const Router = require('express').Router;
const MediaController = require('../controllers/media');
let mediaModel = require('../model/media');
var mediaRoutes = new Router();


// injecting the media model in the controller instance
const mediaControllerIns = new MediaController(mediaModel);

mediaRoutes.get('/', (req, res) => {
  mediaControllerIns.getMedias((err, docs)=> {
    if (err) {
      console.error(err);
      return res.status(500).end();
    }
    res.json(docs);
  })
})

module.exports = mediaRoutes;