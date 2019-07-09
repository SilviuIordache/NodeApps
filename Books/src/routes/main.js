const Router = require('express').Router;

const authorRoutes = require('./author');
const bookRoutes = require('./book');
const mediaRoutes = require('./media');

var mainRouter = new Router();

// mounting the routes on their specific endpoints
mainRouter.use('/', authorRoutes);
mainRouter.use('/', bookRoutes);
mainRouter.use('/', mediaRoutes);

module.exports = mainRouter;