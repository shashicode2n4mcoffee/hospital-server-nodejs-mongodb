const { User } = require("../models");
const { responseSuccess, responseError } = require("../utils/response");

const fetchUsers = async (req, res, next) => {
  try {
    if (req.user.role.toLowerCase() === "admin") {
      const userList = await User.find({});
      if (userList.length)
        return responseSuccess(res, 200, userList, "Fetched the users data ");
      return responseSuccess(res, 204, userList, "Users not found");
    } else {
      responseError(res, 403, {}, "Unauthorized user");
    }
  } catch (error) {
    next(error);
  }
};

const fetchUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (req.user.role.toLowerCase() === "admin") {
      const user = await User.findById(id);
      if (user)
        return responseSuccess(res, 200, user, "Fetched the users data ");
      return responseSuccess(res, 204, user, "Users not found");
    } else {
      responseError(res, 403, {}, "Unauthorized user");
    }
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (req.user.role.toLowerCase() === "admin") {
      const user = await User.findByIdAndDelete(id);
      if (user)
        return responseSuccess(res, 200, user, "User deleted successfully ");
      return responseSuccess(res, 204, user, "Unable to delete the user");
    } else {
      responseError(res, 403, {}, "Unauthorized user");
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { fetchUsers, fetchUserById, deleteUser };
