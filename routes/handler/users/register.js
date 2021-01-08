const { URL_SERVICE_USERS } = process.env
const apiAdapter = require('../../apiAdapter')
const api = apiAdapter(URL_SERVICE_USERS)

module.exports = async (req, res) => {
  try {
    const user = await api.post('/users/register', req.body)
    return res.status(200).json(user.data)
  } catch (error) {
    if (error.code === 'ECONNREFUSED') {
      return res.status(500).json({
        status: 'error',
        message: 'service unavailable',
      })
    }
    const { status, data } = error.response
    return res.status(status).json(data)
  }
}
