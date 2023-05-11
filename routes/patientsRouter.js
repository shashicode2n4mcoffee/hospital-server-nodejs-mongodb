const express = require("express");
const {
  getPatients,
  addPatient,
  getPatientById,
  updatePatientById,
  deletPatientById,
} = require("../controllers");
const verifyJwtToken = require("../middlewares/verifyJwtToken");

const patientsRouter = express.Router();
patientsRouter.get("/:id", verifyJwtToken, getPatientById);
patientsRouter.get("", verifyJwtToken, getPatients);
patientsRouter.post("", verifyJwtToken, addPatient);
patientsRouter.patch("/:id", verifyJwtToken, updatePatientById);
patientsRouter.delete("/:id", verifyJwtToken, deletPatientById);

module.exports = patientsRouter;
