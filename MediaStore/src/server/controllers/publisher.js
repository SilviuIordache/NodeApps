class PublisherController {
  constructor(publisherModel) {
    this.publishers = publisherModel;
  }

  getPublishers(page, name, order, elemPerPage, done) {
    // used for searching inside the aggregation, if name provided
    let searchObj = {};
    if (name) {
      let regex = new RegExp(`${name}`, 'i');
      searchObj = {'Publisher' : regex }
    }
  
    this.publishers
      .find(searchObj, 
        (err, items) => {
          if (err) return done(err);
          this.publishers
          .countDocuments(searchObj,
            (err, count) => {
              if (err) return done(err);
              done(null, { items, count });
            })
        })
      .sort({ 'publications': order })
      .skip(page * elemPerPage)
      .limit(elemPerPage);
  
  }


}

module.exports = PublisherController;
