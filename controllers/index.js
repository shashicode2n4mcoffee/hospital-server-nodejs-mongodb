const { fetchUsers } = require("./userController");
const { registerUser, loginUser } = require("./authCOntroller");
const { getPatients, addPatient } = require("./patientsController");

module.exports = {
  fetchUsers,
  registerUser,
  loginUser,
  getPatients,
  addPatient,
};
