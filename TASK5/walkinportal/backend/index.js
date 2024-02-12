var express = require("express");
var server = express();
var authRoutes = require("./Router/auth");

const cors = require("cors");
server.use(cors());

const connection = require("./Database/database").connection;

const bodyParser = require("body-parser");
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.use("/auth", authRoutes);



server.listen(8000, function () {
  console.log("Express App running at http://127.0.0.1:8000/");
});
