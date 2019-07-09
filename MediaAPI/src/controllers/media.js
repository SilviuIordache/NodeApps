class MediaController {
  constructor(mediaModel) {
    this.medias = mediaModel;
    this.itemsPerPage = 3;
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

  // getting item by field
  getMediaByField(field, done) {
    this.medias
    .find({ [field]: `${value}`}, 
    (err, res) => {
      if (err) return done(err);
      return done(null, res)
    })
    .skip(this.limit * page)
    .limit(this.limit)
  }


  // pagination function
  getMedia(page, done) {
    this.medias.find({}, (err, res) => {
      if (err) return console.log(err);
      return done(null, res);
    }).skip(page * this.itemsPerPage).limit(this.itemsPerPage);
  };

  // adding an item
  createMedia(media, done) {
    console.log('creating new item');
    new this.medias(media).save(function (err) {
      if (err) return done(err);
      return done(null, 'Item created!');
    })
  }

}

module.exports = MediaController;