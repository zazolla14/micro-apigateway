const axios = require('axios')
const { TIMEOUT } = process.env

module.exports = (baseUrl) => {
  return axios.create({
    baseURL: baseUrl, // ? exp: http://localhost:8080 (media)
    timeout: parseInt(TIMEOUT), //? data from .env file is string, so you must parse the data before
  })
}
