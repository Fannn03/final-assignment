const fs = require('fs')
const moment = require('moment')
moment.locale()

module.exports = (req, res, messages) => {

    const time = moment().format("H:mm:ss")
    const content = `[${time}] ${req.method} : ${req.originalUrl} | ${res.statusCode} : ${JSON.stringify(messages)}\n`
    return fs.appendFile('./logs/request.log', content, (err) => {
        if(err) throw new Error(err)
    })

}
