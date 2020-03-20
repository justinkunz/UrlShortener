const mongoose = require("mongoose");
const { Schema } = mongoose;

const urlSchema = new Schema(
  {
    url: { type: String, required: true },
    hash: { type: String, required: true }
  },
  { timestamps: true }
);

const Urls = mongoose.model("Urls", urlSchema);

module.exports = Urls;
