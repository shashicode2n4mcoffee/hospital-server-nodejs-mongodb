const express = require("express");
const { getPatients, addPatient } = require("../controllers");

const patientsRouter = express.Router();

patientsRouter.get("", getPatients);
patientsRouter.post("", addPatient);

module.exports = patientsRouter;
