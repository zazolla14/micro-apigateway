const { URL_SERVICE_COURSES } = process.env
const apiAdapter = require('../../../apiAdapter')
const api = apiAdapter(URL_SERVICE_COURSES)

module.exports = async (req, res) => {
  try {
    const user_id = req.user.data.id
    const course_id = req.body.course_id
    const my_course = await api.post('api/my-courses', {
      user_id,
      course_id,
    })
    return res.json(my_course.data)
  } catch (error) {
    if (error.code === 'ECONNREFUSED') {
      return res.status(500).json({
        status: 'error',
        message: 'service not available',
      })
    }
    const { status, data } = error.response
    return res.status(status).json(data)
  }
}
