const logger = require("../logs/logger")
const bcrypt = require('bcrypt')
const UserSchema = require("../models/UserSchema")
const jwt = require("../config/jwt")

module.exports = {
    register: async (req, res) => {
        
        const {username, password, level} = req.body

        const user =  new UserSchema({
            username: username,
            password: password,
            level: level.toLowerCase()
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

    },
    login: async (req, res) => {
        
        const {username, password} = req.body

        const user = await UserSchema.findOne({
            username: {$regex: new RegExp("^" + username.toLowerCase() + "$", "i")}
        })

        if(!user) {
            let messages = 'username tidak ditemukan'
            
            res.status(404).json({
                result: 'error',
                messages: messages
            })

            return logger(req, res, messages)
        }

        if(!await bcrypt.compare(password, user.password)) {
            let messages = 'password salah'
            
            res.status(404).json({
                result: 'error',
                messages: messages
            })

            return logger(req, res, messages)
        }

        return jwt(req, res, user)

    }
}