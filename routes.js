const express = require('express');
const routes = express.Router();
const homePagina = require('./src/controllers/homePagina');
const loginController = require('./src/controllers/loginController');
const contatoController = require('./src/controllers/contatoController');


const { loginRequiered } = require('./src/middlewares/middleware');

// ROTAS DA HOME
routes.get('/', homePagina.index);
// Rotas de login

routes.get('/login/index', loginController.index);
routes.post('/login/register', loginController.register);
routes.post('/login/login', loginController.login);
routes.get('/login/logout', loginController.logout);


// Rotas de contato 
routes.get('/contato/index', loginRequiered,contatoController.index);
routes.post('/contato/register', loginRequiered,contatoController.register);
routes.get('/contato/index/:id', loginRequiered,contatoController.editIndex);
routes.post('/contato/edit/:id', loginRequiered,contatoController.edit);
routes.post('/contato/delete/:id', loginRequiered,contatoController.delelte);



module.exports = routes;