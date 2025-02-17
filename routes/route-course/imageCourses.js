const express = require('express')
const router = express.Router()
const imageCoursesHandler = require('../handler/courses/image-courses')

router.post('', imageCoursesHandler.create)
router.delete('/:id', imageCoursesHandler.destroy)

module.exports = router
