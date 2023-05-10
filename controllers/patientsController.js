const { Patient } = require("../models");
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

module.exports = { getPatients, addPatient };
