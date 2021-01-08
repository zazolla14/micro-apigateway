const { URL_SERVICE_USERS } = process.env
const apiAdapter = require('../../apiAdapter')
const api = apiAdapter(URL_SERVICE_USERS)

module.exports = async (req, res) => {
  try {
    const { id } = req.user.data
    const user = await api.post('/users/logout', { user_id: id })
    return res.status(200).json(user.data)
  } catch (error) {}
}
