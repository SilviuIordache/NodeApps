const Router = require('express').Router;

const authorRoutes = require('./author');
const bookRoutes = require('./book');
const mediaRoutes = require('./media');

var mainRouter = new Router();

// mounting the routes on their specific endpoints
mainRouter.use('/author', authorRoutes);
mainRouter.use('/book', bookRoutes);
mainRouter.use('/media', mediaRoutes);

module.exports = mainRouter;