const jwt = require('jsonwebtoken')
const logger = require('../logs/logger')
require('dotenv').config()

const env = process.env

module.exports = (req, res, user) => {

    const payload = {
        username: user.username,
        password: user.password,
        level: user.level
    }

    jwt.sign(payload, env.SECRET_KEY, {expiresIn: '1h'}, (err, decoded) => {
        if(err) throw new Error(err)

        res.status(200).json({
            result: 'success',
            message: 'Berhasil login',
            token: `Bearer ${decoded}`
        })

        return logger(req, res, 'Berhasil login')

    })

}