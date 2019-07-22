class PublisherController {
  constructor(mediaModel) {
    this.model = mediaModel;
  }

  get (name, done) {
    this.model.aggregate([
      {
        $match: {
          Publisher: name
        }
      }, {
        $group: {
          _id: '$Publisher',
          publications: {$push: '$_id'},
          minYear: {$min: '$PublicationYear'},
          maxYear: {$max: '$PublicationYear'}
        }
      },
    ]).exec(done);
  }

}

module.exports = PublisherController;