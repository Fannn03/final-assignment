const express = require('express')
const AuthMiddleware = require('../middleware/AuthMiddleware')
const ProductController = require('../controllers/ProductController')

const router = express.Router()

router.get('/', [AuthMiddleware, ProductController.index])

module.exports = router