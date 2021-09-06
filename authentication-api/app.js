const dotenv = require("dotenv")
dotenv.config()

const express = require("express");
const app = express();
const controller = require("./controller");
const routes = require("./routes");

app.use(express.json());

app.post(routes.register, controller.register)

app.post(routes.login, controller.login)

module.exports = app;
