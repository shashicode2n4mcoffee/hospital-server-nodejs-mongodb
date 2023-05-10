const express = require("express");
const { getPatients, addPatient } = require("../controllers");
const verifyJwtToken = require("../middlewares/verifyJwtToken");

const patientsRouter = express.Router();

patientsRouter.get("", verifyJwtToken, getPatients);
patientsRouter.post("", verifyJwtToken, addPatient);

module.exports = patientsRouter;
