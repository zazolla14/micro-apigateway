const express = require('express')
const router = express.Router()
const myCoursesHandler = require('../handler/courses/my-courses')

router.get('', myCoursesHandler.getAll)
router.post('', myCoursesHandler.create)

module.exports = router
