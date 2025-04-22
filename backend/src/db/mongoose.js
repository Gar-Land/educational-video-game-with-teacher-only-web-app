const mongoose = require("mongoose");

const connectionUrl = "mongodb://127.0.0.1:27017";
const dataBaseName = "game-manager-api";
mongoose.connect(`${connectionUrl}/${dataBaseName}`);