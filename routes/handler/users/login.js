const {
  URL_SERVICE_USERS,
  JWT_SECRET,
  JWT_SECRET_REFRESH_TOKEN,
  JWT_ACCESS_TOKEN_EXPIRED,
  JWT_REFRESH_TOKEN_EXPIRED,
} = process.env
const apiAdapter = require('../../apiAdapter')
const api = apiAdapter(URL_SERVICE_USERS)
const jwt = require('jsonwebtoken')

module.exports = async (req, res) => {
  try {
    const user = await api.post('/users/login', req.body)
    const data = user.data.data
    const token = jwt.sign({ data }, JWT_SECRET, {
      expiresIn: JWT_ACCESS_TOKEN_EXPIRED,
    })
    const refreshToken = jwt.sign({ data }, JWT_SECRET_REFRESH_TOKEN, {
      expiresIn: JWT_REFRESH_TOKEN_EXPIRED,
    })
    await api.post('/refresh_tokens', {
      user_id: data.id,
      refresh_token: refreshToken,
    })
    return res.status(200).json({
      status: 'success',
      data: {
        id: data.id,
        email: data.email,
        token,
        refresh_token: refreshToken,
      },
    })
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
