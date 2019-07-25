class PublisherController {
  constructor(mediaModel) {
    this.model = mediaModel;
  }

  // Aggretation request
  get(name, done) {
    this.model.aggregate([{
      $match: {
        Publisher: name
      }
    }, {
      $group: {
        _id: '$Publisher',
        publications: {
          $push: {
            id: '$_id',
            title: '$Title'
          }
        },
        minYear: {
          $min: '$PublicationYear'
        },
        maxYear: {
          $max: '$PublicationYear'
        }
      }
    }, ]).exec(done);
  }

  getTopPublishers(page, name, elemPerPage = 15, done) {
    // used for searching inside the aggregation, if name provided
    let searchObj = {}; 
    if (name) {
      let regex = new RegExp(`${name}`, 'i');
      searchObj = {'Publisher' : regex }
    }

    let uniquePublishers = [
      { $match: searchObj },
      { $group: {
          _id: '$Publisher',
          pubName: {  $first: '$Publisher' },
          count:   {  $sum: 1 },
          minYear: {  $min: '$PublicationYear'},
          maxYear: {  $max: '$PublicationYear'}
        },
      },
    ]
      
    let revOrder = [
      ...uniquePublishers,
      { $sort: { count: -1 } }, //sorting by publications descending
      { $skip: page * elemPerPage  },
      { $limit: elemPerPage },
    ]

    let totalCount = [
      ...uniquePublishers,
      { $count: 'total' }
    ]

    this.model.aggregate(revOrder)
      .exec((err, items) => {
        if (err) return done(err);

        this.model.aggregate(totalCount)
          .exec((err, count) => {
            if (err) return done(err);
    
            done(null, { items, count });
        });
      });
  }

}

module.exports = PublisherController;