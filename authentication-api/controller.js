const service = require("auth-service");

const register = async(req, res) => {
    try {
        const user = await service.register(req.body)

        res.status(201).json(user);
    } catch (error) {
        res.status(error.status).send(error.message)
        console.log(error);
    }
}

const login = async(req, res) => {
    try {
        const user = await service.login(req.body)
        res.status(200).json(user);
    } catch (error) {
        res.status(error.status).send(error.message)
        console.log(error);
    }
}

module.exports = {
    register,
    login
}
