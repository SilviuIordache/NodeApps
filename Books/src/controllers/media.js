class MediaController{
  constructor(mediaModel) {
    this.medias = mediaModel;
  }

  getMedias(done) {
    this.medias.find({}, () => {
      if (err) return done(err);
    }).limit(10);


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