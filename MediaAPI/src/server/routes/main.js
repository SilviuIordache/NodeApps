const Router = require('express').Router;

const mediaRoutes = require('./media');
const publisherRoutes = require('./publisher');

var mainRouter = new Router();

// mounting the routes on their specific endpoints
mainRouter.use('/media', mediaRoutes);

module.exports = mainRouter;