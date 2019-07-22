class PublisherController {
  constructor(mediaModel) {
    this.model = mediaModel;
  }

  // Aggretation request
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
          titles: {$push: '$Title'},
          minYear: {$min: '$PublicationYear'},
          maxYear: {$max: '$PublicationYear'}
        }
      },
    ]).exec(done);
  }

  // normal query
  getPublisherData(name, done) {
    let queryObj = {};
    if (name) {
      queryObj = {'Publisher' : name }
    }
    this.model.find( queryObj,  
      (err, res) => {
        if (err) throw err;
        return done(null, res);
      });
  }
}



module.exports = PublisherController;