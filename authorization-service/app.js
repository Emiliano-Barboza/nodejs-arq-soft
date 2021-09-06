const dotenv = require("dotenv")
dotenv.config()
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

const verifyToken = (req, res, next) => { // TODO: refactor code
    const token = req.body.token || req.query.token || req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }
    try {
        const decoded = jwt.verify(token, config.TOKEN_KEY);
        req.user = decoded;
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
    return next();
};

module.exports = {
    getToken,
    verifyToken
}
