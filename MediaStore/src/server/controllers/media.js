class MediaController {
  constructor(mediaModel) {
    this.mediaItems = mediaModel;
  }

  getMedia(page, field, name, order, elemPerPage = 15, done) {
    let searchObj = {};

    if (name) {
      if (field) searchObj = {[field]: name }
      else searchObj = {$text: { $search: name }}
    }
    this.mediaItems
      .find(searchObj, 
        (err, items) => {
          if (err) return console.log(err);
          this.mediaItems
          .countDocuments(searchObj,
            (err, count) => {
              if (err) return done(err);
              done(null, { items, count });
            })
        })
      .sort({ '_id': order })
      .skip(page * elemPerPage)
      .limit(elemPerPage);
  };

  getMediaById(id, done) {
    this.mediaItems.findById(id, (err, res) => {
      if (err) return done(err);
      done(null, res);
    })
  };

  createMedia(media, done) {
    console.log('creating new media item');
    new this.mediaItems(media)
    .save(function (err) {
      if (err) return done(err);
      done(null, 'Item created!');
    });
  }

  deleteMediaById(id, done) {
    console.log('deleting media item');
    this.mediaItems.findOneAndDelete(
      { _id: id },
      (err, res) => {
        if (err) return done(err);
        done(null, res);
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