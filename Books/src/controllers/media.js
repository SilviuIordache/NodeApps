class MediaController{
  constructor(mediaModel) {
    this.medias = mediaModel;
  }

  getOneItem(done) {
    this.medias.find({}, (err, res) => {
      if (err) return console.log(err);
      return done(null, res);
    }).limit(5);
  };

  getMedias(done) {
    this.medias.find({}, () => {
      if (err) return done(err);
    })
  }

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