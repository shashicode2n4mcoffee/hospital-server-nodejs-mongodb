const { fetchUsers, deleteUser, fetchUserById } = require("./userController");
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
  deleteUser,
  fetchUserById,
  registerUser,
  loginUser,
  getPatients,
  addPatient,
  getPatientById,
  updatePatientById,
  deletPatientById,
};
