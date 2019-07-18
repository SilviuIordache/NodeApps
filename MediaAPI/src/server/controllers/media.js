class MediaController {
  constructor(mediaModel) {
    this.mediaItems = mediaModel;
  }


  // getting item by id (done)
  getMediaById(id, done) {
    this.mediaItems.findById(id, (err, res) => {
      if (err) return console.log(err);
      return done(null, res);
    })
  };

  // pagination function (done)
  getMedia(page, name, order, elemPerPage = 15, done) {
    let searchObj = {};
    if (name) {
      searchObj = {$text: { $search: name }}
    }
    this.mediaItems
      .find( searchObj, 
      (err, res) => {
        if (err) return console.log(err);
        return done(null, res);
      })
      .sort({ '_id': order })
      .skip(page * elemPerPage)
      .limit(elemPerPage);
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