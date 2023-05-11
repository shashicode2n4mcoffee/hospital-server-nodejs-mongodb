const responseSuccess = (res, status = 200, data = [], message = "") => {
  return res.status(status).send({
    success: true,
    data,
    message,
  });
};

const responseError = (
  res,
  status = 500,
  error = [],
  message = "Something went wrong"
) => {
  return res.status(status).send({
    success: false,
    data: error,
    message,
  });
};

module.exports = {
  responseSuccess,
  responseError,
};
