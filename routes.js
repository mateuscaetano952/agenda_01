const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');

// Rotas da home
route.get('/', homeController.paginaInicial);

// Rotas login
route.get('/login/index', loginController.paginaInicial)
route.post('/login/cadastra', loginController.cadastra)
route.post('/login/entra', loginController.entra)
route.get('/login/sair', loginController.sair)



module.exports = route;
