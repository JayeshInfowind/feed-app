const mongoose = require("mongoose");

const contentSchema = mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    require: true,
    default: "",
  },
  isActive: {
    type: Boolean,
    required: true,
    default: true,
  },
});
contentSchema.set("timestamps", true);
module.exports = mongoose.model("content", contentSchema);
