const { Patient, User } = require("../models");
const { responseSuccess, responseError } = require("../utils/response");

const addPatient = async (req, res, next) => {
  try {
    const { fullname, lastname, age, gender, address, occupation, phone } =
      req.body;
    const newPatinet = new Patient({
      fullname,
      lastname,
      age,
      gender,
      address,
      occupation,
      phone,
      docterId: req.user._id,
    });

    const savedPatient = await newPatinet.save();
    if (savedPatient) {
      responseSuccess(
        res,
        201,
        savedPatient,
        "Patient details is saved successfully"
      );
    } else {
      responseError(res, 500, {}, "Unable to save the patient details");
    }
  } catch (error) {
    next(error);
  }
};

const getPatients = async (req, res, next) => {
  try {
    const { page, perPage, search } = req.query;
    const filter = {
      ...(search && {
        fullname: {
          $regex: search,
          $options: "i",
        },
      }),
    };
    const existingPatients = await Patient.find(filter)
      .sort({ createdAt: -1 })
      .skip(page * perPage)
      .limit(perPage);

    const patientCount = await Patient.count(filter);

    if (existingPatients) {
      responseSuccess(
        res,
        200,
        { patientsList: existingPatients, totalPatients: patientCount },
        "Fetched all the Patients"
      );
    } else {
      responseSuccess(
        res,
        200,
        { patientsList: existingPatients, totalPatients: patientCount },
        "No Patinets found for mention creteria"
      );
    }
  } catch (error) {
    next(error);
  }
};

const getPatientById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const fetchedPatient = await Patient.findOne({
      _id: id,
      docterId: req.user._id,
    });
    if (fetchedPatient) {
      return responseSuccess(
        res,
        200,
        fetchedPatient,
        "Patient fetched successfully"
      );
    } else {
      return responseError(res, 200, {}, "No Patient found");
    }
  } catch (error) {
    next(error);
  }
};

const updatePatientById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedPatient = await Patient.findByIdAndUpdate(
      { _id: id },
      {
        ...(req.body.fullname && { fullname: req.body.fullname }),
        ...(req.body.age && { age: req.body.age }),
        ...(req.body.gender && { gender: req.body.gender }),
        ...(req.body.occupation && { occupation: req.body.occupation }),
        ...(req.body.address && { address: req.body.address }),
        ...(req.body.phone && { phone: req.body.phone }),
        ...(req.body.history && { history: req.body.history }),
      },
      {
        new: true,
      }
    );
    if (updatedPatient) {
      return responseSuccess(
        res,
        200,
        updatedPatient,
        "Patient details are successfully updated"
      );
    } else {
      return responseError(
        res,
        500,
        {},
        "Unable to update the patient details. Please try again"
      );
    }
  } catch (error) {
    next(error);
  }
};

const deletPatientById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedPatient = await Patient.findByIdAndDelete(id);
    if (deletedPatient) {
      return responseSuccess(
        res,
        200,
        deletedPatient,
        "Patient deleted successfully"
      );
    } else {
      return responseError(
        res,
        500,
        {},
        "Unable to delete the patient details. Please try again"
      );
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPatients,
  addPatient,
  getPatientById,
  updatePatientById,
  deletPatientById,
};
