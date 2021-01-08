const { URL_SERVICE_COURSES } = process.env
const apiAdapter = require('../../../apiAdapter')
const api = apiAdapter(URL_SERVICE_COURSES)

module.exports = async (req, res) => {
  try {
    const { id } = req.params
    const lesson = await api.put(`api/lessons/${id}`, req.body)
    return res.json(lesson.data)
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
