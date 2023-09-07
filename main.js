const express = require('express')
require('dotenv').config()

const app = express()
const env = process.env

app.listen(env.SERVER_PORT, () => {
    console.log('server started');
})