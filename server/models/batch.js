const mongoose = require("mongoose");
const isEmail = require("validator/lib/isEmail");
const Schema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  batchCode: {
    type: String,

    required: true,
  },
  institutionID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "institution",
    required: true,
  },
  studentList: [
    {
      name: {
        type: String,
      },
      avatar:{
        type:String
      },
      userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      rollNumber: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        index: true,
        unique: true,
        sparse: true,
        trim: true,
        lowercase: true,
        validate(value) {
          if (!isEmail(value)) {
            throw new Error("Email is invalid");
          }
        },
      },
      dept: {
        type: String,
        required: true,
      },
      request:{
        type:Boolean,
        default: false
      }
    },
  ],


  scheduleTest: [
    {
      name: {
        type: String,
      },
      examID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "exam",
        required: true,
      },
      status:{
        type:String,
        required: true,
        enum: ['pending','complete'],
        default:'pending'
      }
    }
  ],

  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("batch", Schema);
