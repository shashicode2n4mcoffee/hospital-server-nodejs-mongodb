const mongoose = require("mongoose");
const { Schema } = mongoose;

const investigationSchema = new Schema(
  {
    description: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Investigation", investigationSchema);
