const express = require("express");
const Class = require("../models/class.js");
const Student = require("../models/student.js");
const Teacher = require("../models/teacher.js");
const {teacherAuth} = require("../middleware/auth.js");
const { 
  getWinsAndLosesPerStudentByLevel, getStatusCount 
} = require("../utils/levelFunctions.js");

const teacherRouter = new express.Router();

teacherRouter.post("/accounts/teachers/sign-in", async (req, res) => {
  try {
    const newTeacher = new Teacher(req.body);
    const authToken = await newTeacher.generateAuthToken();

    let classRoom = await Class.findOne({
      classId: newTeacher.ownedByClass
    });
    if (!classRoom)
      classRoom = await new Class({ 
        classId: newTeacher.ownedByClass 
      }).save();
    
    return res.send({ newTeacher, authToken, classRoom });    
  } catch(error) {
    return res.status(500).send(error);
  }
});

teacherRouter.post("/accounts/teachers/log-in", async (req, res) => {
  try {
    const logedTeacher = await Teacher.findByCredentials(req.body.email, 
    req.body.password);
    const newToken = await logedTeacher.generateAuthToken();

    return res.send({ logedTeacher, newToken });
  } catch(error) {
    return res.status(400).send(error);
  }
});

teacherRouter.post("/accounts/teachers/log-out", teacherAuth, async (req, res) => {
  try {
    req.teacher.tokens = req.teacher.tokens.filter(token => {
      return token.token !== req.token;
    });
    const teacher = await req.teacher.save();
    return res.send({
      deletedToken: req.token, 
      remainingTokens: teacher.tokens
    });
  } catch(error) {
    return res.status(500).send(error);
  }
});

teacherRouter.get("/teachers/details", teacherAuth, async (req, res) => {
  try {
    const {name, ownedByClass} = req.teacher;
    return res.send({ name, ownedByClass});
  } catch(error) {
    return res.status(500).send(error)
  }
});

teacherRouter.delete("/teachers/delete", teacherAuth, async (req, res) => {
  try {
    await Teacher.findByIdAndDelete(req.teacher._id);
    return res.send(req.teacher);
  } catch(error) {
    return res.status(500).send(error);
  }
});

teacherRouter.get("/teachers/matches", teacherAuth, async (req, res) => {
  try {
    const teacherClass = await Class.findOne({
      classId: req.teacher.ownedByClass
    })
    .populate({
      path: "students",
      populate: {
        path: "matches",
        populate: {
          path: "ownedByLevel",
          select: "level"
        }
      }
    });

    if (!teacherClass)
      return res.status(404).send({
        message: `Seems like the teacher belongs to a non-existing class`
      });
    if (!teacherClass.students.length)
      return res.status(400).send({
        message: `Lo sentimos, pero por el momento sus estudiantes no se 
        han registrado`
      });

    const numberOfMatches = teacherClass.students.reduce((acc, student) => {
      return acc + student.matches.length;
    }, 0);
    if (!numberOfMatches)
      return res.status(400).send({
        message: `Lo sentimos, pero por el momento ninguno de sus 
        estudiantes tiene partidas`
      });

    const studentMatches = teacherClass.students.map(student => {
      const {studentId, name, gender} = student;

      const matches = student.matches.map(match => {
        const {score, status, createdAt, ownedByLevel} = match;
        const playedAt = createdAt.toISOString();

        return ({
          studentId, name, gender, score, status, 
          level: ownedByLevel.level, 
          playedAt: playedAt.substring(0, playedAt.indexOf("T"))
        });
      });

      return matches;
    });

    return res.send({matches: studentMatches.flat()});
  } catch(error) {
    return res.status(500).send(error);
  }
});

teacherRouter.get("/teachers/levels", teacherAuth, async (req, res) => {
  try {
    const teacherClass = await Class.findOne({
      classId: req.teacher.ownedByClass
    })
    .populate({
      path: "students",
      populate: {
        path: "matches",
        populate: {
          path: "ownedByLevel",
          select: "level"
        },
        select: "status"
      }
    });

    if (!teacherClass)
      return res.status(404).send({
        message: `Seems like the teacher belongs to a non-existing class`
      });
    if (!teacherClass.students.length)
      return res.status(400).send({
        message: `Lo sentimos, pero por el momento sus estudiantes no se 
        han registrado`
      });

    const colorForWins = "var(--color-wins)";
    const colorForLoses = "var(--color-loses)";
    const levels = [];
    for (let i = 1; i < 4; ++i) {
      const lvl_ms = getWinsAndLosesPerStudentByLevel(teacherClass.students, i);
      const lvl_ws = getStatusCount(lvl_ms, "wins");
      const lvl_ls = getStatusCount(lvl_ms, "loses");
      levels.push(
        [
          {status: "wins", amount: lvl_ws, fill: colorForWins}, 
          {status: "loses", amount: lvl_ls, fill: colorForLoses}
        ]
      );
    }

    return res.send({levels});
  } catch(error) {
    return res.status(500).send(error);
  }
});

teacherRouter.get("/teachers/search/students", teacherAuth, async (req, res) => {
  try {
    const id = req.query.studentId.toLowerCase();

    const searchedStudent = await Student.findOne({
      studentId: id, 
      ownedByClass: req.teacher.ownedByClass
    })
    .populate({
      path: "matches", 
      populate: {
        path: "ownedByLevel", 
        select: "level" 
      }
    });

    const {
      name, firstSurname, secondSurname, 
      studentId, ownedByClass: classId, createdAt
    } = searchedStudent;
    const joinedAt = createdAt.toISOString(); 

    const matches = searchedStudent.matches.map(match => {
      const playedAt = match.createdAt.toISOString();

      return ({
        score: match.score, 
        playedAt: playedAt.substring(0, playedAt.indexOf("T")), 
        level: match.ownedByLevel.level
      });
    });

    return res.send({ 
      student: {
        name, firstSurname, secondSurname, 
        studentId, classId, 
        joinedAt: joinedAt.substring(0, joinedAt.indexOf("T"))
      },
      matches
    });

  } catch(error) {
    return res.status(404).send(error);
  }
});

module.exports = teacherRouter;