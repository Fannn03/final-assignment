const mongoose = require('mongoose')
require('dotenv').config()

const env = process.env

module.exports = async () => {
    try{
        await mongoose.connect(`${env.HOST}/${env.DATABASE}`)
        console.log('connected to mongodb');
    }catch(err){
        throw new Error(err)
    }
}