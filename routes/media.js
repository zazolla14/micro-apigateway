const express = require('express')
const router = express.Router()
const mediaHandler = require('./handler/media')

const verifyToken = require('../middlewares/verifyToken')

router.get('/', mediaHandler.getAll)
router.post('/', verifyToken, mediaHandler.create)
router.delete('/:id', mediaHandler.destroy)

module.exports = router
