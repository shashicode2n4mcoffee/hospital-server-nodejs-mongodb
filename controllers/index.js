const { fetchUsers } = require("./userController");
const { registerUser, loginUser } = require("./authCOntroller");

module.exports = { fetchUsers, registerUser, loginUser };
