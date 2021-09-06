const dotenv = require("dotenv")
dotenv.config()

const { BadRequestError, ConflictError} = require('./model/errors');
const repository = require('auth-repository')
const signService = require('authorization-service')
const bcrypt = require('bcryptjs')

const validateLogin = async (credentials) => {
    const { email, password } = credentials;

    if (!(email && password)) {
        const message = "All input are required"
        throw new BadRequestError(message)
    }

    const user = await repository.getUserByEmail(email)

    if (!user) {
        const message = "Invalid Credentials"
        throw new BadRequestError(message)
    }

    const validPassword = await bcrypt.compare(password, user.password)

    if (!validPassword) {
        const message = "Invalid Credentials"
        throw new BadRequestError(message)
    }

    return user
}

const validateRegister = async (credentials) => {
    const { first_name, last_name, email, password } = credentials;

    if (!(email && password && first_name && last_name)) {
        const message = "All input are required"
        throw new BadRequestError(message)
    }

    const userExists = await repository.getUserByEmail(email)

    if (userExists) {
        const message = "User Already Exist."
        throw new ConflictError(message)
    }
}

const encryptPassword = async (password) => {
    const encryptedPassword = await bcrypt.hash(password, 10)
    return encryptedPassword
}

const buildUser = async (credentials) => {
    const { first_name, last_name, email, password } = credentials;

    const encryptedPassword = await encryptPassword(password);
    const userData = {
        first_name,
        last_name,
        email: email.toLowerCase(),
        password: encryptedPassword,
    }
    return userData
}

const login = async (credentials) => {
    const user = await validateLogin(credentials)
    const token = await signService.getToken(user)
    user.token = token;

    return user
}

const register = async (credentials) => {
    await validateRegister(credentials)

    const userData = await buildUser(credentials)

    const user = await repository.addUser(userData)
    const token = await signService.getToken(user)
    user.token = token;

    return user
}

module.exports = {
    login,
    register
}
