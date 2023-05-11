const { fetchUsers } = require("./userController");
const { registerUser, loginUser } = require("./authCOntroller");
const {
  getPatients,
  addPatient,
  getPatientById,
  updatePatientById,
  deletPatientById,
} = require("./patientsController");

module.exports = {
  fetchUsers,
  registerUser,
  loginUser,
  getPatients,
  addPatient,
  getPatientById,
  updatePatientById,
  deletPatientById,
};
