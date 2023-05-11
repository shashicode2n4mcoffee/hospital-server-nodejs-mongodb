const express = require("express");
const { fetchUsers, fetchUserById, deleteUser } = require("../controllers");
const verifyJwtToken = require("../middlewares/verifyJwtToken");

const userRouter = express.Router();

userRouter.get("/:id", verifyJwtToken, fetchUserById);
userRouter.get("", verifyJwtToken, fetchUsers);
userRouter.delete("/:id", verifyJwtToken, deleteUser);

module.exports = userRouter;
