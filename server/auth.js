const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;

const createToken = (user) => {
    const data = {
        id: user._id,
        username: user.username,
        // email: user.email,
        // role: user.role,
        // isAdmin: user.isAdmin,
    };
    return jwt.sign(data, secret, { expiresIn: "3d" });
};

const verify = (req, res, next) => {
    let token = req.headers.authorization;
    try {
        if (!token) {
            return res.json("Authentication failed! Please login first!");
        }

        token = token.slice(7, token.length);
        return jwt.verify(token, secret, (error) => {
            if (error && error.name === "TokenExpiredError")
                return res.status(401).json({ error: "Token has expired" });
            if (error) {
                return res.status(401).json("Invalid Token");
            } else {
                next();
            }
        });
    } catch (error) {
        console.log(`Im in verify \n${error.message}`);
        res.json(error.message);
    }
};

const decode = (token) => {
    if (!token) {
        return null;
    } else {
        token = token.slice(7, token.length);

        return jwt.verify(token, secret, (error, data) => {
            if (error) {
                return null;
            } else {
                return jwt.decode(token, { complete: true }).payload;
            }
        });
    }
};

module.exports = { createToken, verify, decode };
