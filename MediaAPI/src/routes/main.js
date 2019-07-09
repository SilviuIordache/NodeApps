const Router = require('express').Router;
const mediaRoutes = require('./media');

var mainRouter = new Router();

// mounting the routes on their specific endpoints
mainRouter.use('/', mediaRoutes);

module.exports = mainRouter;