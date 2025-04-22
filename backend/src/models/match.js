const mongoose = require("mongoose");

const matchSchema = mongoose.Schema({
  score: { type: Number },
  status: { type: String },
  ownedByStudent: {
    ref: "Student",
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  ownedByLevel: {
    ref: "Level",
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
}, { timestamps: true });

matchSchema.index({createdAt: 1}, {expireAfterSeconds: 7776000});

const Match = mongoose.model("Match", matchSchema);
module.exports = Match;