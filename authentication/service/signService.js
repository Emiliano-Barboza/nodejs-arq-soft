const jwt = require("jsonwebtoken")

const getToken = async (user) => {
    const token = jwt.sign(
        {
            user_id: user._id,
            email: user.email
        },
        process.env.TOKEN_KEY,
        {
            expiresIn: "2h",
        }
    );
    return token
}

module.exports = {
    getToken
}
