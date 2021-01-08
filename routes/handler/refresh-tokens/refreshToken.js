const jwt = require('jsonwebtoken')
const {
  URL_SERVICE_USERS,
  JWT_SECRET,
  JWT_SECRET_REFRESH_TOKEN,
  JWT_ACCESS_TOKEN_EXPIRED,
} = process.env
const apiAdapter = require('../../apiAdapter')
const api = apiAdapter(URL_SERVICE_USERS)
const validate = require('fastest-validator')
const v = new validate()

module.exports = async (req, res) => {
  try {
    const { refresh_token, email } = req.body

    const schema = {
      refresh_token: 'string',
      email: 'email',
    }
    const validate = v.validate(req.body, schema)
    if (validate.length) {
      return res.status(400).json({
        status: 'error',
        message: validate,
      })
    }

    await api.get('/refresh_tokens', { params: { refresh_token } })
    jwt.verify(refresh_token, JWT_SECRET_REFRESH_TOKEN, (err, decoded) => {
      if (err) {
        return res.status(403).json({
          status: 'error',
          message: err.message,
        })
      }
      if (email !== decoded.data.email) {
        return res.status(400).json({
          status: 'error',
          message: 'email is not valid',
        })
      }
      const token = jwt.sign({ data: decoded.data }, JWT_SECRET, {
        expiresIn: JWT_ACCESS_TOKEN_EXPIRED,
      })

      return res.status(200).json({
        status: 'success',
        id: decoded.data.id,
        email,
        new_token: token,
      })
    })
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
