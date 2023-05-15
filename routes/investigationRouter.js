const express = require('express')
const {
  addInvestigation,
  updateInvestigationById,
  deleteInvestigationById,
  getInvestigationById,
} = require('../controllers')
const verifyJwtToken = require('../middlewares/verifyJwtToken')

const investigationRouter = express.Router()

investigationRouter.get('/:id', verifyJwtToken, getInvestigationById)
investigationRouter.delete(
  '/:id/:patientId',
  verifyJwtToken,
  deleteInvestigationById
)
investigationRouter.post('', verifyJwtToken, addInvestigation)
investigationRouter.patch(
  '/:id/:patientId',
  verifyJwtToken,
  updateInvestigationById
)

module.exports = investigationRouter
