const Router = require('express').Router;
const UserController = require('../controllers/user');
let userModel = require('../model/user');
const userRoutes = new Router();

// injecting user model in the controller instance
const userController = new UserController(userModel);
