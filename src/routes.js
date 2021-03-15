const { Router } = require('express');

const alunoController = require('./app/controllers/AlunoController');
const instrutorController = require('./app/controllers/InstrutorController');
const exercicioController = require('./app/controllers/ExercicioController');
const treinoController = require('./app/controllers/TreinoController');

const routes = new Router();

routes.get('/alunos', alunoController.getAll);
routes.get('/alunos/:id', alunoController.getOne);
routes.post('/alunos', alunoController.create);
routes.put('/alunos', alunoController.updateAluno);
routes.delete('/alunos/:id', alunoController.deleteAluno);

routes.get('/instrutores', instrutorController.getAll);

routes.get('/exercicios', exercicioController.getAll);
routes.get('/exercicios/:id', exercicioController.getOne);
routes.post('/exercicios', exercicioController.create);
routes.put('/exercicios', exercicioController.update);

routes.get('/treinos/:aluno_id', treinoController.getAllByAluno);
routes.get('/treino/:id', treinoController.getOne);
routes.put('/treino', treinoController.update);
routes.post('/treino', treinoController.create);
routes.delete('/treino/:id', treinoController.deleteTreino);

module.exports = routes;