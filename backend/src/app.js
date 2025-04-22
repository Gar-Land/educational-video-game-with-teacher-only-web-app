const express = require("express");
const teacherRouter = require("./routers/teacher.js");
const studentRouter = require("./routers/student.js");
// const classRouter = require("./routers/class.js");
const levelRouter = require("./routers/level.js");
const matchRouter = require("./routers/match.js");
const cors = require("cors");
require("./db/mongoose.js");


const app = express();
const portNumber = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use(teacherRouter);
app.use(studentRouter);
// app.use(classRouter);
app.use(levelRouter);
app.use(matchRouter);

app.listen(portNumber, () => {
  console.log(`Server up and running at port ${portNumber}`);
});