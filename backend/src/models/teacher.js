const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validator = require("validator");

const teacherSchema = mongoose.Schema({
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
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowerCase: true,
    validate(email) {
      if (!validator.isEmail(email)) 
        throw new Error("The email provided isnt a valid email");
    }
  },
  password: {
    type: String,
    required: true,
    validate(password) {
      if(password.length < 7 || password.includes("contraseña"))
        throw new Error(`A password must be greater or equal to 7 
        characters, while not containing \"constraseña\" in itself`);
    }
  },
  ownedByClass: {
    ref: "Class",
    type: String,
    required: true
  },
  tokens: [{
    token: {
      type: String,
      required: true,
    }
  }]
}, { timestamps: true });

teacherSchema.pre("save", async function (next) {
  const teacher = this;
  if (teacher.isModified("password"))
    teacher.password = await bcrypt.hash(teacher.password, 8);
  next();
});

teacherSchema.statics.findByCredentials = async (email, password) => {
  const teacher = await Teacher.findOne({ email });
  if (!teacher)
    throw new Error("Invalid credentials");

  const isPassword = await bcrypt.compare(password, teacher.password);
  if (!isPassword)
    throw new Error("Unable to login");

  return teacher
};

teacherSchema.methods.generateAuthToken = async function () {
  const teacher = this;
  const authToken = await jwt.sign({ _id: teacher._id.toString() }, "escuela");
  teacher.tokens.push({ token: authToken });
  await teacher.save();
  return authToken;
}; 

const Teacher = mongoose.model("Teacher", teacherSchema);
module.exports = Teacher;