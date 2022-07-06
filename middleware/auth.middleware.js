const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = async(req, res, next) => {
    const { authorization } = req.headers;

    if(!authorization) {
        return res.json({status:400, error: "Ошибка авторизации"})
    }

    const [type, token] = authorization.split(" ");

    if(type !== "Bearer") {
        return res.json({status: 400, error: "Ошибка авторизации"})
    }
    try {
        req.user = await jwt.verify(token, process.env.JWT_SECRET_KEY);
        next()
    } catch (e) {
        res.json({status:401, error: "Ошибка токена: " + e.toString()})
    }
}