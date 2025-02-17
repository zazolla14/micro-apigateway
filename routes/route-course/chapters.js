const express = require('express')
const router = express.Router()
const chaptersHandler = require('../handler/courses/chapters')

router.get('', chaptersHandler.getAll)
router.get('/:id', chaptersHandler.get)
router.post('', chaptersHandler.create)
router.put('/:id', chaptersHandler.update)
router.delete('/:id', chaptersHandler.destroy)

module.exports = router
