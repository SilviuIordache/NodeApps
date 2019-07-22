const Router = require('express').Router;
const UserController = require('../controllers/user');
let userModel = require('../model/user');
const userRoutes = new Router();

// injecting user model in the controller instance
const userController = new UserController(userModel);

// master get
userRoutes.get('/', (req, res) => {
  const elemsPerPage = 10;
  const page = req.query.page || 0;
  const name = req.query.name;
  const ord = req.query.ord;
  const elemPerPage = parseInt(req.query['elemPerPage']) || elemsPerPage;
  let ordParam = (ord === 'asc' ? 1 : -1)

  userController.getUsers(page, name ,ordParam, elemPerPage,
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).end();
      }
      res.json(result);
    });
});

// get user by id
userRoutes.get('/:id', (req, res) => {
  userController.getUserById(
    req.params['id'],
    (err, result) => {
      if (err)  throw (err);
      res.json(result);
    }
  )
})

// adding a new user
userRoutes.post('/', (req, res) => {
  let item = req.body;

  userController.createUser(item, (err, result) => {
    if (err) return res.status(500).send(JSON.stringify(err));
    res.status(201).send(result);
  })
})



module.exports = userRoutes;