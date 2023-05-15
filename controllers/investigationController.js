const { mongoose, ClientSession } = require('mongoose')
const { Investigation, Patient } = require('../models/index')
const { findById } = require('../models/user')
const { responseSuccess, responseError } = require('../utils/response')

const addInvestigation = async (req, res, next) => {
  const session = await mongoose.startSession()
  session.startTransaction()
  try {
    const { patientId } = req.body
    const investigation = new Investigation({
      ...req.body,
    })

    const newInvestigation = await investigation.save()

    const UpdatedPatient = await Patient.findByIdAndUpdate(
      { _id: patientId },
      {
        $push: {
          investigation: newInvestigation._id,
        },
      },
      { new: true }
    )
      .populate({
        path: 'investigation',
        model: 'Investigation',
      })
      .populate({
        path: 'treatment',
        model: 'Treatment',
      })

    await session.commitTransaction()
    if (newInvestigation) {
      responseSuccess(res, 200, UpdatedPatient, 'Added Investigation data')
    } else {
      responseError(
        res,
        401,
        null,
        'Unable to add Investigation. Please try again sometime later'
      )
    }
  } catch (error) {
    await session.abortTransaction()
    next(error)
  } finally {
    session.endSession()
  }
}

const updateInvestigationById = async (req, res, next) => {
  try {
    const { id, patientId } = req.params
    const updatedInvestigation = await Investigation.findByIdAndUpdate(
      { _id: id },
      {
        ...req.body,
      },
      { new: true }
    )

    if (updatedInvestigation) {
      const updatedPatientDetails = await Patient.findOne({ _id: patientId })
        .populate({
          path: 'investigation',
          model: 'Investigation',
        })
        .populate({
          path: 'treatment',
          model: 'Treatment',
        })
      return responseSuccess(
        res,
        200,
        updatedPatientDetails,
        'Fetched Investigation data'
      )
    } else {
      responseError(res, 401, null, 'Unable to update investigation')
    }
  } catch (error) {
    next(error)
  }
}

const deleteInvestigationById = async (req, res, next) => {
  const session = await mongoose.startSession()
  session.startTransaction()
  try {
    const { id, patientId } = req.params
    const investigation = await Investigation.findByIdAndDelete(id)

    const newPatient = await Patient.findByIdAndUpdate(
      { _id: patientId },
      {
        $pull: {
          investigation: id,
        },
      },
      { new: true }
    )
    await session.commitTransaction()
    if (investigation) {
      return responseSuccess(
        res,
        200,
        investigation,
        'Deleted investigation data'
      )
    } else {
      responseError(res, 401, null, 'Unable to delete investigation')
    }
  } catch (error) {
    await session.abortTransaction()
    next(error)
  } finally {
    session.endSession()
  }
}

const getInvestigationById = async (req, res, next) => {
  try {
    const { id } = req.params
    const investigation = await Investigation.findById(id)
    if (investigation) {
      return responseSuccess(
        res,
        200,
        investigation,
        'Fetched investigation data'
      )
    } else {
      responseError(res, 401, null, 'There is no investigation')
    }
  } catch (error) {
    next(error)
  }
}

module.exports = {
  addInvestigation,
  updateInvestigationById,
  deleteInvestigationById,
  getInvestigationById,
}
