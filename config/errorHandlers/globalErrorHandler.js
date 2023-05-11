const { responseError } = require("../../utils/response");

const globalErrorHandler = (error, req, res, next) => {
  console.error("ERROR : ", error);
  return responseError(
    res,
    error.status || 500,
    error.message,
    "Something went wrong"
  );
};

module.exports = { globalErrorHandler };
