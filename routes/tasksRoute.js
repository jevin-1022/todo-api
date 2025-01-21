"use strict";

const express = require("express");
const routes = express.Router();
const taskController = require("../controllers/tasksControllers");

// Create Task
routes.post("/", taskController.createTask);

// Update task
routes.put("/:id", taskController.updateTask);

// Get task list
routes.get("/", taskController.getAllTask);

// Delete task
routes.delete("/:id", taskController.deleteTask);

module.exports = routes;
