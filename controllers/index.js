const { fetchUsers, deleteUser, fetchUserById } = require('./userController')
const { registerUser, loginUser } = require('./authCOntroller')
const {
  getPatients,
  addPatient,
  getPatientById,
  updatePatientById,
  deletPatientById,
} = require('./patientsController')
const {
  addInvestigation,
  updateInvestigationById,
  deleteInvestigationById,
  getInvestigationById,
} = require('./investigationController')

const {
  addTreatment,
  updateTreatmentById,
  deleteTreatmentById,
  getTreatmentById,
} = require('./treatmentController')

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
  addInvestigation,
  updateInvestigationById,
  deleteInvestigationById,
  getInvestigationById,
  addTreatment,
  updateTreatmentById,
  deleteTreatmentById,
  getTreatmentById,
}
