const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const Schema = new mongoose.Schema({
    username: {
        type: String,
        index: true,
        unique: true,
        required: [true, 'username tidak boleh kosong'],
        minLength: [4, 'username tidak boleh kurang dari 4 karakter'],
        maxLength: [12, 'username tidak boleh lebih dari 12 karakter'],
        validate: {
            validator: (value) => {
                return /^\S*$/.test(value)
            },
            message: () => 'username tidak boleh mengandung spasi'
        }
    },
    password: {
        type: String,
        required: [true, 'password tidak boleh kosong'],
    }
})

Schema.pre('save', async function(next){

    if(this.password.length < 4) throw new Error('password tidak boleh kurang dari 4 karakter')
    if(this.password.length > 16) throw new Error('password tidak boleh lebih dari 16 karakter')

    this.password = await bcrypt.hash(this.password, 10)

    return next()

})

module.exports = mongoose.model('users', Schema)