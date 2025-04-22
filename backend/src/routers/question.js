const express = require("express");
const Question = require("../models/question.js");

const questionRouter = new express.Router();

questionRouter.post("/question/create", async (req, res) => {
  try {
    const newQuestion = new Question(req.body);
    await newQuestion.save();
    return res.send(newQuestion);
  } catch(error) {
    return res.status(400).send(error);
  }
});

questionRouter.delete("/question/delete", async (req, res) => {
  try {
    const deletedQuestion = await Question.findByIdAndDelete(req.body.id);
    if (!deletedQuestion)
      return res.status(404).send({
        message: "Couldn't find the desired question"
      });

    return res.send(deletedQuestion);
  } catch(error) {
    return res.status(404).send(error);
  }
});

module.exports = questionRouter;