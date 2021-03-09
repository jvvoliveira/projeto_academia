const pg = require('pg-promise')();
const database = pg({
    user: 'postgres',
    password: 'root',
    host: 'localhost',
    port: 5432,
    database: 'academia'
});

module.exports = database;