const mongoose = require("mongoose");
const { Schema } = mongoose;

const patientSchema = new Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    age: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    occupation: {
      type: String,
      required: false,
    },
    address: {
      type: String,
      required: false,
    },
    phone: {
      type: String,
      required: true,
    },
    history: {
      type: String,
      required: false,
    },
    docterId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    investigation: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Investigation",
      },
    ],
    treatments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Treatment",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Patient", patientSchema);
