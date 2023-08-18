const mongoose = require("mongoose");
const isEmail = require("validator/lib/isEmail");

const Schema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!isEmail(value)) {
        throw new Error("Email is invalid");
      }
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
    // minlength: 256,
    maxlength: 256,
    validate(value) {
      if (value.toLowerCase().includes("password")) {
        throw new Error("Password cannot contain password");
      }
    },
  },
  batchID:[
  {  
    type: mongoose.Schema.Types.ObjectId,
    ref: "batch",
  }
  ],
  institutionID:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "institution",
  },

  type: {
    type: String,
    required: true,
    trim: true,
    enum: ["student", "teacher", "admin", "institution"],
    default: "student",
    validator(value) {
      if (value !== "student" || value !== "teacher" || value !== "admin" || value !== "institution" ) {
        throw new Error("Invalid user type");
      }
    }
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error("Age must be a positive number");
      }
    },
  },
  phoneNumber:{
    type:String
  },
  gender:{
    type:String,
    enum:["Male","Female"]
  },
  avatar:{
    type:String,
  },
  goal: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "course",
      required: true,
    },
  ],
});

module.exports = mongoose.model("User", Schema);
