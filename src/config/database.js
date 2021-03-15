require('dotenv/config');

const pg = require('pg-promise')();
const database = pg({
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    port: 5432,
    database: process.env.DB_NAME
});

module.exports = database;