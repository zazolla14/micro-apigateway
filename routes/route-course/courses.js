const express = require('express')
const router = express.Router()
const coursesHandler = require('../handler/courses/courses')

const verifyTokens = require('../../middlewares/verifyToken')
const permission = require('../../middlewares/permission')

router.get('', coursesHandler.getAll)
router.get('/:id', coursesHandler.get)
router.post('', verifyTokens, permission('admin'), coursesHandler.create)
router.put('/:id', verifyTokens, permission('admin'), coursesHandler.update)
router.delete('/:id', verifyTokens, permission('admin'), coursesHandler.destroy)

module.exports = router
