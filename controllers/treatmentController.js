const { mongoose, ClientSession } = require('mongoose')
const { Treatment, Patient } = require('../models/index')
const { responseSuccess, responseError } = require('../utils/response')

const addTreatment = async (req, res, next) => {
  const session = await mongoose.startSession()
  session.startTransaction()
  try {
    const { desc, patientId } = req.body
    const treatment = new Treatment({
      desc,
    })

    const newTreatment = await treatment.save()

    const UpdatedPatient = await Patient.findByIdAndUpdate(
      { _id: patientId },
      {
        $push: {
          treatment: newTreatment._id,
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
    if (newTreatment) {
      responseSuccess(res, 200, UpdatedPatient, 'Added treatment data')
    } else {
      responseError(
        res,
        401,
        null,
        'Unable to add treatment. Please try again sometime later'
      )
    }
  } catch (error) {
    await session.abortTransaction()
    next(error)
  } finally {
    session.endSession()
  }
}

const updateTreatmentById = async (req, res, next) => {
  try {
    const { id, patientId } = req.params
    const updatedTreatment = await Treatment.findByIdAndUpdate(
      { _id: id },
      {
        ...req.body,
      },
      { new: true }
    )

    if (updatedTreatment) {
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
        'Fetched Treatment data'
      )
    } else {
      responseError(res, 401, null, 'Unable to update treatment')
    }
  } catch (error) {
    next(error)
  }
}

const deleteTreatmentById = async (req, res, next) => {
  const session = await mongoose.startSession()
  session.startTransaction()
  try {
    const { id, patientId } = req.params
    const treatment = await Treatment.findByIdAndDelete(id)

    const newPatient = await Patient.findByIdAndUpdate(
      { _id: patientId },
      {
        $pull: {
          treatment: id,
        },
      },
      { new: true }
    )
    await session.commitTransaction()
    if (newPatient) {
      return responseSuccess(res, 200, newPatient, 'Deleted treatment data')
    } else {
      responseError(res, 401, null, 'Unable to delete treatment')
    }
  } catch (error) {
    await session.abortTransaction()
    next(error)
  } finally {
    session.endSession()
  }
}

const getTreatmentById = async (req, res, next) => {
  try {
    const { id } = req.params
    const treatment = await Treatment.findById(id)

    if (treatment) {
      return responseSuccess(res, 200, treatment, 'Fetched treatment data')
    } else {
      responseError(res, 401, null, 'There is no treatment')
    }
  } catch (error) {
    next(error)
  }
}
module.exports = {
  addTreatment,
  updateTreatmentById,
  deleteTreatmentById,
  getTreatmentById,
}
