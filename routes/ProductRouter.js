const express = require('express')
const AuthMiddleware = require('../middleware/AuthMiddleware')
const ProductController = require('../controllers/ProductController')
const LevelMiddleware = require('../middleware/LevelMiddleware')

const router = express.Router()

router.get('/', [AuthMiddleware, ProductController.index])
router.post('/', [AuthMiddleware, LevelMiddleware('admin')])

module.exports = router