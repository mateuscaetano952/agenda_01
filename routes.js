const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');

// Rotas da home
route.get('/', homeController.paginaInicial);

// Rotas login
route.get('/login/index', loginController.paginaInicial)
route.post('/login/cadastra', loginController.cadastra)


module.exports = route;
