"use strict";

const express = require("express");
const routes = express.Router();
const authController = require("../controllers/authControllers");

// Create Task
routes.post("/signup", authController.signUp);

// Update task
routes.post("/login", authController.login);

module.exports = routes;
