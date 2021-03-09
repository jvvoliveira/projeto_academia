const { Router } = require('express');

const alunoController = require('./app/controllers/AlunoController');
const instrutorController = require('./app/controllers/InstrutorController');
const exercicioController = require('./app/controllers/ExercicioController');


const routes = new Router();

routes.get('/alunos', alunoController.getAll);
routes.get('/alunos/:id', alunoController.getOne);
routes.post('/alunos', alunoController.create);

routes.get('/instrutores', instrutorController.getAll);

routes.get('/exercicios', exercicioController.getAll);
routes.get('/exercicios/:id', exercicioController.getOne);
routes.post('/exercicios', exercicioController.create);

module.exports = routes;