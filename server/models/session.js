const mongoose = require("mongoose");
const isEmail = require("validator/lib/isEmail");

const Schema = mongoose.Schema(
    {},
    {strict:false }
);

module.exports = mongoose.model("sessions", Schema);
