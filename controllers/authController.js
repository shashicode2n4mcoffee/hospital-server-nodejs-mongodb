const bcrypt = require("bcrypt");
const { User } = require("../models");
const { responseSuccess, responseError } = require("../utils/response");

const registerUser = async (req, res, next) => {
  try {
    const hashedPassword = bcrypt.hashSync(req.body.password, 5);
    const newUserObject = {
      ...req.body,
      password: hashedPassword,
    };
    const newUser = new User(newUserObject);
    const savedUser = await newUser.save();
    if (savedUser) {
      responseSuccess(res, 201, savedUser, "User added successfully");
    } else {
      responseError(
        res,
        500,
        {},
        "Unable to add the user. Please try again later"
      );
    }
    responseSuccess(res);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerUser,
};
