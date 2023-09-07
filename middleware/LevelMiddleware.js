const logger = require('../config/logger')

module.exports = (allowedLevel) => {
    
    return (req, res, next) => {

        if(!req.user.level.includes(allowedLevel)) {

            let message = 'Kamu tidak punya akses untuk ke halaman ini'

            res.status(401).json({
                result: 'error',
                message: message
            })

            return logger(req, res, message)

        }

        return next()

    }

}