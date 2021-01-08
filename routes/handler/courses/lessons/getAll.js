const { URL_SERVICE_COURSES } = process.env
const apiAdapter = require('../../../apiAdapter')
const api = apiAdapter(URL_SERVICE_COURSES)

module.exports = async (req, res) => {
  try {
    const lessons = await api.get('api/lessons', {
      params: {
        ...req.query,
      },
    })
    return res.json(lessons.data)
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
