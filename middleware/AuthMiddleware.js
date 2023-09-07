const jwt = require('jsonwebtoken')
const logger = require('../config/logger')
require('dotenv').config()
const env = process.env

module.exports = (req, res, next) => {

    let token = req.headers.authorization

    if(!token) {
        res.status(401).json({
            result: 'error',
            message: 'Token tidak di temukan'
        })

        return logger(req, res, 'Token tidak di temukan')
    }

    token = token.split(' ')[1]

    jwt.verify(token, env.SECRET_KEY, (err, decoded) => {

        if(err) {
            res.status(401).json({
                result: 'error',
                message: 'Token tidak valid'
            })
    
            return logger(req, res, 'Token tidak valid')
        }

        req.user = decoded

        return next()

    })


}