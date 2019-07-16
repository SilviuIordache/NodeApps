class MediaController {
  constructor(mediaModel) {
    this.mediaItems = mediaModel;
    this.itemsPerPage = 15;
  }

  // getting first 5 items (done)
  getSomeMedia(done) {
    this.mediaItems.find({}, (err, res) => {
      if (err) return console.log(err);
      return done(null, res);
    }).limit(5);
  };

  // getting item by id (done)
  getMediaById(id, done) {
    this.mediaItems.findById(id, (err, res) => {
      if (err) return console.log(err);
      return done(null, res);
    })
  };

  // getting item by field (done)
  getMediaByField(page, field, done) {
    this.mediaItems
      .find({ $text: { $search: field }
        },
        (err, res) => {
          if (err) return done(err);
          return done(null, res)
        })
      .skip(this.itemsPerPage * page)
      .limit(this.itemsPerPage)
  }

  // getting item by publisher
  getMediaByPublisher(page, publisher, done) {
    this.mediaItems
    .find({Publisher: publisher},
      (err, res) => {
        if (err) return done(err);
        return done(null, res)
      })
    .skip(this.itemsPerPage * page)
    .limit(this.itemsPerPage)
  }

  // pagination function (done)
  getMediaByPage(page, order, done) {
    this.mediaItems
    .find({}, (err, res) => {
      if (err) return console.log(err);
      return done(null, res);
    })
    .sort({'_id': order})
    .skip(page * this.itemsPerPage)
    .limit(this.itemsPerPage);
  };

  // adding an item (done)
  createMedia(media, done) {
    console.log('creating new media item');
    new this.mediaItems(media).save(function (err) {
      if (err) return done(err);
      return done(null, 'Item created!');
    });
  }

  // deleting an item (done)
  deleteMediaById(id, done) {
    console.log('deleting media item');
    this.mediaItems.findOneAndDelete(
      { _id: id },
      (err, res) => {
        if (err) return console.log(err);
        return done(null, res);
      });
  }
  
  // modify item (done)
  editMediaItem(id, newValues, done) {
    console.log('editing media item');
    this.mediaItems.findOneAndUpdate( 
      { _id: id },
      newValues,
      { upsert: true, new: true, lean: true },
      done
    );
  }

}

module.exports = MediaController;