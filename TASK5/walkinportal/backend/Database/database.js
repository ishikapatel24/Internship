const mysql = require("mysql2");
const express = require("express");
var app = express();

const connection = mysql.createConnection({
  host: `localhost`,
  user: `root`,
  password: `Ishika24*`,
  database: `walk-in-portal`,
  multipleStatements: true
});

connection.connect();

module.exports = {
  connection,
};
