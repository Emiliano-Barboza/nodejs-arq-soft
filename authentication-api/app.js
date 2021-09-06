const dotenv = require("dotenv")
dotenv.config()

const express = require("express");
const service = require("auth-service");
const app = express();

app.use(express.json());

app.post("/register", async(req, res) => {
    try {
        const user = await service.register(req.body)

        res.status(201).json(user);
    } catch (error) {
        res.status(error.status).send(error.message)
        console.log(error);
    }
});

app.post("/login", async(req, res) => {
    try {
        const user = await service.login(req.body)
        res.status(200).json(user);
    } catch (error) {
        res.status(error.status).send(error.message)
        console.log(error);
    }
});

module.exports = app;
