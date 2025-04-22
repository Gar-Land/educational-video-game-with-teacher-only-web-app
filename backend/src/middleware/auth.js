const jwt = require("jsonwebtoken");
const Teacher = require("../models/teacher.js");
const Student = require("../models/student.js");

const teacherAuth = async (req, res, next) => {
  try {
    const bearerToken = req.header("Authorization").replace("Bearer ", "");
    const _id = jwt.decode(bearerToken, "escuela")._id;
    
    const logedTeacher = await Teacher.findOne({ _id, "tokens.token": bearerToken });
    if (!logedTeacher)
      throw new Error("");
    
    req.teacher = logedTeacher;
    req.token = bearerToken;
    next();
  } catch (error) {
    res.status(401).send({ error: "Couldn't authenticate" });
  }
};

const studentAuth = async (req, res, next) => {
  try {
    const bearerToken = req.header("Authorization").replace("Bearer ", "");
    const _id = jwt.decode(bearerToken, "escuela")._id;

    const logedStudent = await Student.findOne({ _id, "tokens.token": bearerToken });
    if (!logedStudent)
      throw new Error("");
        
    req.student = logedStudent;
    req.token = bearerToken;
    next();
  } catch(error) {
    res.status(401).send({error: "Couldn't authenticate"});
  }
};

module.exports = {teacherAuth, studentAuth};