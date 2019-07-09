class MediaController{
  constructor(mediaModel) {
    this.medias = mediaModel;
  }

  // getting first 5 items
  getSomeMedia(done) {
    this.medias.find({}, (err, res) => {
      if (err) return console.log(err);
      return done(null, res);
    }).limit(5);
  };

  // getting item by id
  getMediaById(id, done) {
    this.medias.findById(id, (err, res) => {
      if (err) return console.log(err);
      return done(null, res);
    })
  };

  // pagination function
  getMedia(itemsPerPage, page, done) {
    this.medias.find({}, (err, res) => {
      if (err) return console.log(err);
      return done(null, res);
    }).skip(page * itemsPerPage).limit(itemsPerPage);
  };

  
  //------------------------ nO WORKY BELOW V-------------------------
  addMedia(media, done) {
    let mediaIns = new this.medias(media);
    mediaIns.save(done);
  }

  deleteMedia(id, done) {
    // create the query by searching for the media and remove it
    // then execute the query
    this.medias.find({id: id}).remove()
    .exec(done);
  }
}

module.exports = MediaController;