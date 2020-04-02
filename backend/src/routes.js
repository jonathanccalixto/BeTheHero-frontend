const express = require('express');

const OngsController = require('./controllers/OngsController');
const IncidentsController = require('./controllers/IncidentsController');

const routes = express.Router();

// Ongs routes
routes.get('/ongs', OngsController.index);
routes.post('/ongs', OngsController.create);

// Incidents routes
routes.post('/incidents', IncidentsController.create);

module.exports = routes;