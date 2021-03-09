const database = require('../../config/database');

const getAlunos = () => {
    return database.query('select p.* from Pessoa p, Instrutor i where p.id != i.id');
}

const getAluno = (id) => {
    const params = { id };
    return database.one('select p.* from Pessoa p, Instrutor i where p.id = ${id} and p.id != i.id', params);
}

const createAluno = (nome, email) => {
    const params = {nome, email}
    return database.none('insert into Pessoa(nome, email) values(${nome}, ${email})', params);
}

module.exports = {
    getAlunos,
    getAluno,
    createAluno
};