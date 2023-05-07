const responseSuccess = (res, status, data, message) => {
  return res.status(status).send({
    success: true,
    data,
    message,
  })
}

const responseError = (res, status, error, message) => {
  return res.status(status).send({
    success: false,
    data: error,
    message,
  })
}

module.exports = {
  responseSuccess,
  responseError,
}
