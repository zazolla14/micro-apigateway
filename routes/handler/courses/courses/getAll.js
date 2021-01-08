const { URL_SERVICE_COURSES, HOSTNAME } = process.env
const apiAdapter = require('../../../apiAdapter')
const api = apiAdapter(URL_SERVICE_COURSES)

module.exports = async (req, res) => {
  try {
    const courses = await api.get('api/courses', {
      params: { ...req.query },
    })
    const courses_data = courses.data
    const first_links = courses_data.links.first.split('?').pop()
    const last_links = courses_data.links.last.split('?').pop()
    courses_data.links.first = `${HOSTNAME}/courses?${first_links}`
    courses_data.links.last = `${HOSTNAME}/courses?${last_links}`

    if (courses_data.links.prev) {
      const prev_links = courses_data.links.prev.split('?').pop()
      courses_data.links.prev = `${HOSTNAME}/courses?${prev_links}`
    }
    if (courses_data.links.next) {
      const next_links = courses_data.links.next.split('?').pop()
      courses_data.links.next = `${HOSTNAME}/courses?${next_links}`
    }
    courses_data.meta.path = `${HOSTNAME}/courses`

    const meta_links = courses_data.meta.links
    meta_links.forEach((element) => {
      if (element.url) {
        const url = element.url.split('?').pop()
        element.url = `${HOSTNAME}/courses?${url}`
      }
    })

    return res.json(courses.data)
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
