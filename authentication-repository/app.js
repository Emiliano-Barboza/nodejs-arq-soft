const dotenv = require("dotenv")
dotenv.config()

const database = require("./config/database")
database.connect()
const User = require("./model/user");

const getUserByEmail = async (email) => {
    const user = await User.findOne({ email });
    return user
}

const addUser = async (userData) => {
    // Create user in our database
    const user = await User.create({
        first_name: userData.first_name,
        last_name: userData.last_name,
        email: userData.email.toLowerCase(),
        password: userData.password,
    });

    return user;
}

module.exports = {
    addUser,
    getUserByEmail
}

