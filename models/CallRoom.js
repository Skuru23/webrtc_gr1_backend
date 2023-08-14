const mongoose = require("mongoose");

const callRoomSchema = mongoose.Schema(
  { 
    name:{
      type: String,
      require: true,
    },
    registor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    participants: {
      type: [String],
      require: true,
    },
    startTime: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      minlength: 6,
      maxlength: 20,
      require: true,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("CallRoom", callRoomSchema);