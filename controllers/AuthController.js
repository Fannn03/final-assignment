const logger = require("../config/logger")
const UserSchema = require("../models/UserSchema")

module.exports = {
    register: async (req, res) => {
        
        const {username, password} = req.body

        const user =  new UserSchema({
            username: username,
            password: password
        })

        try {
            await user.save()
        }catch (err) {

            if(err.code === 11000) {
                let messages = 'username telah dipakai'
                
                res.status(400).json({
                    result: 'error',
                    messages: messages
                })
    
                return logger(req, res, messages)
            }

            let messages = {}

            if(err.errors) {
                const objValues = Object.values(err.errors)
                objValues.map(error => {
                    messages[error.path] = error.message 
                })
            }else{
                messages.error = err.message
            }

            res.status(400).json({
                result: 'error',
                messages: messages
            })

            return logger(req, res, messages)

        }

        res.status(200).json({
            result: 'success',
            messages: 'Berhasil mendaftarkan user',
            data: user
        })

        return logger(req, res, 'Berhasil mendaftarkan user')

    }
}