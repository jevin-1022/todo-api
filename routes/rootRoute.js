"use strict";

const express = require("express");
const routes = express.Router();

// root route
routes.get("/", (request, response) => {
  response.send({
    name: "todo-API",
    date: new Date(),
    test: "1",
  });
});

module.exports = routes;
