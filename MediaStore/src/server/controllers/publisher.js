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

  getTopPublishers(page, elemPerPage = 15, done) {
    this.model.aggregate([{
        $group: {
          _id: '$Publisher',
          pubName: {  $first: '$Publisher' },
          count:   {  $sum: 1 },
          minYear: {  $min: '$PublicationYear'},
          maxYear: {  $max: '$PublicationYear'}
        },
      },
      { $sort: { count: -1 } },
      { $skip: page * elemPerPage  },
      { $limit: elemPerPage },
    ])
    .exec((err, items) => {
      if (err) return console.log(err);
      this.model.aggregate([
        { $group: {  _id: '$Publisher' }}, 
        { $group: { _id: 1,  count: { $sum: 1 }}}
      ])
    .exec((err, count) => {
        if (err) return console.log(err);
        done(null, { items, count });
      });
    });
  }

  findTopPublishers(err, items) {
      if (err) return console.log(err);
      this.model.aggregate([
        { $group: {  _id: '$Publisher' }}, 
        { $group: { _id: 1,  count: { $sum: 1 }}}
      ])
  }

  countTopPublishers() {

  }

}

module.exports = PublisherController;