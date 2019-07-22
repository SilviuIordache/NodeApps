class MediaController {
  constructor(mediaModel) {
    this.mediaItems = mediaModel;
  }

  getMediaById(id, done) {
    this.mediaItems.findById(id, (err, res) => {
      if (err) return console.log(err);
      return done(null, res);
    })
  };

  getMedia(page, name, order, elemPerPage = 15, done) {
    let searchObj = {};
    if (name) {
      searchObj = {$text: { $search: name }}
    }
    this.mediaItems
      .find(searchObj, 
        (err, res) => {
          if (err) return console.log(err);
          return done(null, res);
        })
      .sort({ '_id': order })
      .skip(page * elemPerPage)
      .limit(elemPerPage);
  };

  getMediaCount(name, done) {
    let searchObj = {}
    if (name) {
      searchObj = {$text: {$search: name}}
    }

    this.mediaItems
      .countDocuments(searchObj,
        (err, res) => {
          if (err) throw err;
          return done(null, res);
        })
  }

  createMedia(media, done) {
    console.log('creating new media item');
    new this.mediaItems(media)
    .save(function (err) {
      if (err) return done(err);
      return done(null, 'Item created!');
    });
  }

  deleteMediaById(id, done) {
    console.log('deleting media item');
    this.mediaItems.findOneAndDelete(
      { _id: id },
      (err, res) => {
        if (err) return console.log(err);
        return done(null, res);
      });
  }

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