const jwt = require("jsonwebtoken");
const { responseError } = require("../utils/response");
const { User } = require("../models");

const verifyJwtToken = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) responseError(res, 403, {}, "Unauthorized user");

    jwt.verify(token, process.env.JWT_KEY, async (error, payload) => {
      if (error) responseError(res, 403, {}, "Unauthorized user");

      const user = await User.findById(payload.id);
      req.user = user;
      next();
    });
  } catch (error) {
    next(error);
  }
};

module.exports = verifyJwtToken;
