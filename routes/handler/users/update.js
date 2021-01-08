const { URL_SERVICE_USERS } = process.env
const apiAdapter = require('../../apiAdapter')
const api = apiAdapter(URL_SERVICE_USERS)

module.exports = async (req, res) => {
  try {
    // return res.json(req.user) //? data dari verify token, berisi data lengkap
    const id = req.user.data.id

    const user = await api.put(`/users/${id}`, req.body)
    return res.status(200).json(user.data)
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
