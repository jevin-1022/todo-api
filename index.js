"use strict";

require('dotenv').config()
const connectDB = require('./db');
const bodyParser = require("body-parser");
var cors = require('cors')
const express = require("express");

// routes
const rootRoutes = require("./routes/rootRoute");
const authRoutes = require("./routes/authRoute");
const tasksRoutes = require("./routes/tasksRoute");

// Middleware
const { authenticateJWT } = require("./middleware/jwtAuth");

const app = express();
app.use(cors())
app.use(bodyParser.json());

// Connect to Database
connectDB();

app.use("", rootRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/tasks", authenticateJWT, tasksRoutes);

app.listen(3000, () => console.log("Server ready on port 3000."));

module.exports = app;
