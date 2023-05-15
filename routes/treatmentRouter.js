const express = require('express')
const {
  addTreatment,
  updateTreatmentById,
  deleteTreatmentById,
  getTreatmentById,
} = require('../controllers')
const verifyJwtToken = require('../middlewares/jwt')

const treatmentRouter = express.Router()

treatmentRouter.get('/:id', verifyJwtToken, getTreatmentById)
treatmentRouter.delete('/:id/:patientId', verifyJwtToken, deleteTreatmentById)
treatmentRouter.post('', verifyJwtToken, addTreatment)
treatmentRouter.patch('/:id/:patientId', verifyJwtToken, updateTreatmentById)

module.exports = treatmentRouter
