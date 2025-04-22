const express = require("express");
const Match = require("../models/match.js");
const Student = require("../models/student.js");
const Level = require("../models/level.js");

const matchRouter = new express.Router();

matchRouter.post("/matches/create", async (req, res) => {
  try {
    const newMatch = new Match(req.body);
    await newMatch.save();
    return res.send(newMatch);
  } catch(error) {
    return res.status(400).send(error);
  }
});

matchRouter.delete("/matches/delete", async (req, res) => {
  try {
    const deletedMatch = await Match.findByIdAndDelete(req.body.id);
    if (!deletedMatch) 
      return res.status(404).send({
        message: `Couln't find the desired match`
      });

    return res.send(deletedMatch);
  } catch(error) {
    return res.status(502).send(error);
  }
});

module.exports = matchRouter;