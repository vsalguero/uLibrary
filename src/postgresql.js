const { Pool } = require("pg");

const db = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.HOST,
    database: process.env.DB
});

module.exports = db;