const express = require('express')
const bodyParser = require('body-parser')
require('dotenv').config()
const AuthRouter = require('./routes/AuthRouter')
const ProductRouter = require('./routes/ProductRouter')
const database = require('./config/database')

const app = express()
const env = process.env

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use(AuthRouter)
app.use('/products', ProductRouter)

app.listen(env.SERVER_PORT, async () => {
    await database()
    console.log('server started');
})