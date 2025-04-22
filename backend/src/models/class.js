const mongoose = require("mongoose");
const Teacher = require("./teacher.js");
const Student = require("./student.js");

const classSchema = mongoose.Schema({
  classId: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowerCase: true
  }
}, { timestamps: true });

classSchema.virtual("teachers", {
  ref: "Teacher",
  foreignField: "ownedByClass",
  localField: "classId"
});

classSchema.virtual("students", {
  ref: "Student",
  foreignField: "ownedByClass",
  localField: "classId"
});

classSchema.pre("remove", async function (next) {
  const group = this;
  await Student.deleteMany({ ownedByClass: group.classId });
  await Teacher.updateMany({ ownedByClass: group.classId }, { ownedByClass: null });
  next();
});

const Class = mongoose.model("Class", classSchema);
module.exports = Class;