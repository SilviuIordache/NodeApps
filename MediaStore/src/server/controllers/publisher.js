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

  getTopPublishers(limitNo, done) {
    this.model.aggregate([{
      $group : { 
        _id: '$Publisher',
        pubName: { $first: '$Publisher' },
        count : { $sum : 1 },
        minYear: {
          $min: '$PublicationYear'
        },
        maxYear: {
          $max: '$PublicationYear'
        }
       },
    },
    { $sort: { count: -1}},
    { $limit : limitNo }
  ]).exec(done);
  } 
}



module.exports = PublisherController;