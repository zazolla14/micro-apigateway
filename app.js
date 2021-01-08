require('dotenv').config()
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

const mediaRouter = require('./routes/media')
const usersRouter = require('./routes/users')
const refreshTokensRouter = require('./routes/refreshTokens')
const mentorsRouter = require('./routes/route-course/mentors')
const coursesRouter = require('./routes/route-course/courses')
const chaptersRouter = require('./routes/route-course/chapters')
const lessonsRouter = require('./routes/route-course/lessons')
const imageCoursesRouter = require('./routes/route-course/imageCourses')
const myCoursesRouter = require('./routes/route-course/myCourses')
const reviewsRouter = require('./routes/route-course/reviews')
const webhookRouter = require('./routes/webhook')
const ordersPaymentsRouter = require('./routes/ordersPayments')

const verifyToken = require('./middlewares/verifyToken')
const permission = require('./middlewares/permission')

const app = express()

app.use(logger('dev'))
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: false, limit: '50mb' }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/media', verifyToken, permission('admin', 'student'), mediaRouter)
app.use('/users', usersRouter)
app.use('/refresh_tokens', refreshTokensRouter)
app.use('/mentors', verifyToken, permission('admin'), mentorsRouter)
app.use('/courses', coursesRouter)
app.use('/chapters', verifyToken, permission('admin'), chaptersRouter)
app.use('/lessons', verifyToken, permission('admin'), lessonsRouter)
app.use('/image-courses', verifyToken, permission('admin'), imageCoursesRouter)
app.use(
  '/my-courses',
  verifyToken,
  permission('admin', 'student'),
  myCoursesRouter
)
app.use('/reviews', verifyToken, permission('admin', 'student'), reviewsRouter)
app.use('/webhook', webhookRouter)
app.use(
  '/orders',
  verifyToken,
  permission('admin', 'student'),
  ordersPaymentsRouter
)

module.exports = app
