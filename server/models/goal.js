const { schema, model, default: mongoose } = require("mongoose");

const goalSchema = new schema(
  {
    courseName: {
      type: String,
      required: true,
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "course",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    plan: {
      type: String,
      required: true,
      default: "free",
      enum: ["free", "standard", "pro"],
    },
    status: {
      type: String,
      required: true,
      default: "active",
      enum: ["active", "inactive"],
    },
    examHistory: [
      {
        examId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "exam",
          required: true,
        },
        examName: {
          type: String,
          required: true,
        },
        score: {
          type: Number,
          required: true,
        },
        totalMarks: {
          type: Number,
          required: true,
        },
        date: {
          type: Date,
          required: true,
        },
      },
    ],
    topics: [
      {
        topicName: {
          type: String,
          required: true,
        },
        
        questionAttempted: {
          type: Number,
          required: true,
          default: 0,
        },
        questionCorrect: {
          type: Number,
          required: true,
          default: 0,
        },
        questionWrong: {
          type: Number,
          required: true,
          default: 0,
        },
        questionSkipped: {
          type: Number,
          required: true,
          default: 0,
        },
        questionTotal: {
          type: Number,
          required: true,
          default: 0,
        },
        accuracy: {
          type: Number,
          required: true,
          default: 0,
        },
      },
    ],
  },
  { timestamps: true }
);

const Goal = model("goal", goalSchema);
