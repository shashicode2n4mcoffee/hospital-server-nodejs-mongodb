const mongoose = require("mongoose");
const { Schema } = mongoose;

const treatementSchema = new Schema(
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

module.exports = mongoose.model("Treatment", treatementSchema);
