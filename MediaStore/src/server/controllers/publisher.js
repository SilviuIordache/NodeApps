const config = require('../../../config');

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

    let pipelineStage = [
      { $match: {'Publisher': {$ne : "-"}}},
      { $match: searchObj},
      { $group: {
          _id: '$Publisher',
          pubName: { $first: '$Publisher' },
          count:   { $sum: 1 },
          minYear: { $min: { $cond: [ 
                                      { $eq: ["$PublicationYear", "-"] },
                                      '9999',
                                      '$PublicationYear'] } },
          maxYear: { $max: '$PublicationYear'}
        },
      },
      { $facet: {
          publishers: [
              { $sort: { count: -1 } },
              { $skip: page * elemPerPage  },
              { $limit: elemPerPage },
              { $group: { _id: null, publishers: { $push: "$$ROOT"} } }
          ],
          total: [
              { $group: { _id: null, total: { $sum: 1 } } }
           ]
         }
      },
      //{ $out : `${config.aggCol}`}
    ]
      
    this.model.aggregate(pipelineStage)
      .exec((err, res) => {
        if (err) return done(err);
        done (null, res);
      });
  }

}

module.exports = PublisherController;