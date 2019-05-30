const {DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_NAME} = require('../config');
const mysql = require('mysql');
const co = require('co-mysql');

let connect = mysql.createPool({
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASS,
    database: DB_NAME,
})

module.exports = co(connect);