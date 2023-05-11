const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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
      const token = jwt.sign(
        {
          id: savedUser._id,
        },
        process.env.JWT_KEY
      );
      responseSuccess(
        res,
        201,
        { ...savedUser._doc, accessToken: token },
        "User added successfully"
      );
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

const loginUser = async (req, res, next) => {
  try {
    const existingUser = await User.findOne({
      email: req.body.email,
      isDeleted: false,
    }).select("+password");

    if (!existingUser)
      return responseError(
        res,
        404,
        {},
        "Please check your email and try again"
      );

    const isCorrectPassword = bcrypt.compareSync(
      req.body.password,
      existingUser?.password
    );

    if (!isCorrectPassword)
      return responseError(res, 403, {}, "Incorrect password");

    if (existingUser) {
      const token = jwt.sign(
        {
          id: existingUser._id,
        },
        process.env.JWT_KEY
      );
      responseSuccess(
        res,
        200,
        { ...existingUser._doc, accessToken: token },
        "Login successful"
      );
    } else {
      responseError(res, 500, {}, "Unable to login . Please try again later");
    }
  } catch (error) {
    next(Error);
  }
};

module.exports = {
  registerUser,
  loginUser,
};
