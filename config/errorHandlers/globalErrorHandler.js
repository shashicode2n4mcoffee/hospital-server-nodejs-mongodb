const { responseError } = require('../../utils/response')

const globalErrorHandler = (error, req, res, next) => {
  return responseError(
    res,
    error.status || 500,
    error.message,
    'Something went wrong'
  )
}

module.exports = { globalErrorHandler }
