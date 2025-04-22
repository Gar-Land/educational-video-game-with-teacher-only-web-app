const mongoose = require("mongoose");
const Match = require("./match.js");
const Question = require("./question.js");

const levelSchema = mongoose.Schema({
  level: {
    type: Number,
    unique: true,
    required: true,
    validate(number) {
      if(number < 1)
        throw new Error("A game level must be a positive number");
    }
  }
}, { timestamps: true });

levelSchema.virtual("matches", {
  ref: "Match",
  foreignField: "ownedByLevel",
  localField: "_id"
});

levelSchema.virtual("questions", {
  ref: "Question",
  foreignField: "ownedByLevel",
  localField: "_id"
});

const Level = mongoose.model("Level", levelSchema);
module.exports = Level;