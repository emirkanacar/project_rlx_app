const jwt = require('jsonwebtoken');

const Token = require('../models/Token');

module.exports = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (error,decoded) => {
        if(error) {
            switch (error.name) {
                case 'JsonWebTokenError':
                    return res.send({ message: "Invalid token", appCode: 50}, 500);
                    next();

                case 'TokenExpiredError':
                    return res.send({ message: "Token has expired", appCode: 400}, 400);
                    next();

                default:
                    return res.send({ message: "Authorization error", appCode: 400}, 400);
                    next();
            }
        }
        if(decoded === null)
        {
            return res.send({ message: "Authorization error", appCode: 400}, 400);
        }else {
            req.userData = decoded;
            next();
        }
    });
};