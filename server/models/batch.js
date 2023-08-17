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
  scheduleTest: [
    {
      quesID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "question-bank",
        required: true,
      },
      title: {
        type: String,
      },
      level: {
        easy: {
          type: String,
          default: "0",
        },
        medium: {
          type: String,
          default: "0",
        },
        hard: {
          type: String,
          default: "0",
        },
      },
    },
  ],

  studendList: [
    {
      name: {
        type: String,
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
    },
  ],

  studendRequest: [
    {
      name: {
        type: String,
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
    },
  ],
  setDate: {
    type: String,
    default:'0'
  },
  setTimeFrom: {
    type: String,
    default:'0'
  },
  setTimeTo: {
    type: String,
    default:'0'
  },
  setMark: {
    type: String,
    default:'0'
  },

  setNegativeMark: {
    type: String,
    default:'0'
  },
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
