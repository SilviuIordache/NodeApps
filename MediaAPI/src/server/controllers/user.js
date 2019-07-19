class UserController {
  constructor(userModel) {
    this.users = userModel;
  }

  getUsers(page, name, order, elemPerPage = 10, done) {
    let searchObj = {};
    if (name) {
      searchObj = {$text: { $search: name }}
    }
    this.users
      .find(searchObj,
        (err, res) => {
          if (err) return console.log(err);
          return done(null, res);
        })
      .sort({ '_id': order })
      .skip(page * elemPerPage)
      .limit(elemPerPage);
  };

  getUserById(id, done) {
    this.users.findById(id, (err, res) => {
      if (err) return console.log(err);
      return done(null, res);
    })
  };

  createUser(user, done) {
    new this.users(user)
    .save(function (err) {
      if (err) return done(err);
      return done(null, 'User created');
    });
  };

}

module.exports = UserController;