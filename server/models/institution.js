const mongoose = require("mongoose");

const Schema = mongoose.Schema({
 name:{
    type:String,
    required: true,
 },
 id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  avatar:{
    type:String
  },
  teacherList:[
    {
        name:{
            type:String,
            
        },
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
          }
    }
  ],
  batch:[{
    name:{
      type:String,
    },
    batchID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "batch",
        required: true,
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

module.exports = mongoose.model("institution", Schema);