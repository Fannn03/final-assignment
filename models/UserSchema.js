const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: [true, 'username tidak boleh kosong'],
        minLength: [4, 'username tidak boleh kurang dari 4 karakter'],
        maxLength: [12, 'username tidak boleh lebih dari 12 karakter']
    },
    password: {
        type: String,
        required: [true, 'password tidak boleh kosong'],
    }
})

Schema.pre('save', function(next){

    if(this.password.length < 4) throw new Error('password tidak boleh kurang dari 4 karakter')
    if(this.password.length > 16) throw new Error('password tidak boleh lebih dari 16 karakter')

    return next()

})

module.exports = mongoose.model('users', Schema)