const express = require('express')
require('dotenv').config()
const AuthRouter = require('./routes/AuthRouter')
const database = require('./config/database')

const app = express()
const env = process.env

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(AuthRouter)

app.listen(env.SERVER_PORT, async () => {
    await database()
    console.log('server started');
})