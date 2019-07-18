const Router = require('express').Router;

const mediaRoutes = require('./media');
//const userRoutes = require('./user');

var mainRouter = new Router();

// mounting the routes on their specific endpoints
mainRouter.use('/media', mediaRoutes);
//mainRouter.use('/user', userRoutes);

module.exports = mainRouter;