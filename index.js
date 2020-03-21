require("dotenv").config();
const express = require("express");
const app = express();
const routes = require("./routes");
const path = require("path");
const mongoose = require("mongoose");
const { scheduleDelete } = require("./scripts");

// Connect mongo db
const { MONGODB_URI, PORT } = process.env;
mongoose.connect(MONGODB_URI || "mongodb://localhost/URL_SHORT");

// Set express middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/assets", express.static(path.join(__dirname, "public", "assets")));

// Express Routes + Listener
app.use(routes);
app.listen(PORT || 3000);

// Schedule deletion jobs
scheduleDelete();
