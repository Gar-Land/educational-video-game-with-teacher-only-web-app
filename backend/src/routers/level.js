const express = require("express");
const Level = require("../models/level.js");
const Question = require("../models/question.js");

const levelRouter = new express.Router();

levelRouter.post("/levels/create", async (req, res) => {
  try {
    const newLevel = new Level(req.body);
    await newLevel.save();
    return res.send(newLevel);
  } catch(error) {
    return res.status(502).send(error);
  }
});

levelRouter.delete("/levels/delete", async (req, res) => {
  try {
    const deletedLevel = await Level.findOneAndDelete({level: req.body.level});
    if (!deletedLevel)
      return res.status(404).send({ message: "Couldn't find the desired level" })

    return res.send(deletedLevel);
  } catch(error) {
    return res.status(404).send(error);
  }
});

levelRouter.get("/levels/by-number/:number", async (req, res) => {
  try {
    const level = await Level.findOne({
      level: parseInt(req.params.number)
    });
    if (!level)
      return res.status(404).send({error: "Level not found"});

    return res.status(200).send({
      levelId: level._id.toString()
    });
  } catch (error) {
    return res.status(500).send({error: error.message});
  }
});

module.exports = levelRouter;