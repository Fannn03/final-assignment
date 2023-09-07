const express = require('express')
require('dotenv').config()
const AuthRouter = require('./routes/AuthRouter')

const app = express()
const env = process.env

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(AuthRouter)

app.listen(env.SERVER_PORT, () => {
    console.log('server started');
})