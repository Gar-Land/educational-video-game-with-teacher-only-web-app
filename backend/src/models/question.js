const mongoose = require("mongoose");

const questionSchema = mongoose.Schema({
  question: {
    type: String,
    required: true,
    trim: true,
    lowerCase: true
  },
  answer: {
    type: String,
    required: true
  },
  ownedByLevel: {
    ref: "Level",
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
}, { timestamps: true });

const Question = mongoose.model("Question", questionSchema);
module.exports = Question;