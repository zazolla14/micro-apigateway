const { URL_SERVICE_ORDERS_PAYMENTS } = process.env
const apiAdapter = require('../../apiAdapter')
const api = apiAdapter(URL_SERVICE_ORDERS_PAYMENTS)

module.exports = async (req, res) => {
  try {
    const webhook = await api.post('api/webhook', req.body)
    return res.json(webhook.data)
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
