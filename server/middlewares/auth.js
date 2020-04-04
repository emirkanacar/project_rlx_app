const jwt = require('jsonwebtoken');

const Token = require('../models/Token');

module.exports = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (error,decoded) => {
        if(error) {
            switch (error.name) {
                case 'JsonWebTokenError':
                    return res.send(500, { message: "Invalid token", appCode: 50});
                    next();
                    break;

                case 'TokenExpiredError':
                    return res.send(400, { message: "Token has expired", appCode: 40});
                    next();
                    break;

                default:
                    return res.send(400, { message: "Authorization error", appCode: 40});
                    next();
                    break;
            }
        }
        if(decoded === null)
        {
            return res.send(400, { message: "Authorization error", appCode: 40});
        }else {
            req.userData = decoded;
            next();
        }
    });
};