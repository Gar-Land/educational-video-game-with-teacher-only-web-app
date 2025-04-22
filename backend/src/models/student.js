const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Match = require("./match.js");

const studentSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  firstSurname: {
    type: String,
    required: true,
    trim: true
  },
  secondSurname: {
    type: String,
    required: true,
    trim: true
  },
  gender: {
    type: String,
    required: true,
    trim: true,
  },
  studentId: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  ownedByClass: {
    ref: "Class",
    type: String,
    required: true
  },
  tokens: [{
    token: {
      type: String,
      required: true
      }
  }]
}, { timestamps: true });

studentSchema.virtual("matches", {
  ref: "Match",
  foreignField: "ownedByStudent",
  localField: "_id",
});

studentSchema.pre("remove", async function (next) {
  const student = this;
  await Match.deleteMany({ ownedByStudent: student._id });
  next();   
});

studentSchema.statics.findByCredentials = (studentId, ownedByClass) => {
  const student = Student.findOne({studentId, ownedByClass});
  if (!student)
    throw new Error("Invalid credentials");
  return student;
};

studentSchema.methods.generateAuthToken = async function () {
  const student = this;
  const authToken = await jwt.sign({ _id: student._id.toString()}, "escuela");
  student.tokens.push({ token: authToken });
  await student.save();
  return authToken;
};

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;
