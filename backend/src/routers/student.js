const express = require("express");
const Class = require("../models/class.js");
const Match = require("../models/match.js");
const Student = require("../models/student.js");
const {studentAuth} = require("../middleware/auth.js");

const studentRouter = new express.Router();

studentRouter.post("/accounts/students/sign-in", async (req, res) => {
  try {
    const newStudent = new Student(req.body);
    const authToken = await newStudent.generateAuthToken();

    let classRoom = await Class.findOne({
      classId: newStudent.ownedByClass
    });
    if (!classRoom)
      classRoom = await new Class({
        classId: newStudent.ownedByClass
      }).save();

    return res.send({ newStudent, authToken, classRoom });
  } catch(error) {
    return res.status(400).send(error);
  }    
});

studentRouter.post("/accounts/students/log-in", async (req, res) => {
  try {
    const {studentId, ownedByClass} = req.body;
    const logedStudent = await Student.findByCredentials(
      studentId, ownedByClass
    );
    await logedStudent.generateAuthToken();
    return res.status(200).send({
      IdStudent: logedStudent._id, 
      success: true
    });
  } catch(error) {
    return res.status(400).send({error, success: false});
  }
});

studentRouter.post("/accounts/students/log-out", studentAuth, async (req, res) => {
  try {
    req.student.tokens = req.student.tokens.filter(token => { 
      return token.token !== req.token;
    });
    const student = await req.student.save();
    return res.send({ 
      deletedToken: req.token, 
      remainingTokens: student.tokens 
    });
  } catch(error) {
    return res.status(500).send();
  }    
});

studentRouter.delete("/students/delete", studentAuth, async(req, res) => {
  try {
    await Student.findByIdAndDelete(req.student._id);
    return res.send(req.student);
  } catch(error) {
    return res.status(500).send(error);
  }
});

module.exports = studentRouter;