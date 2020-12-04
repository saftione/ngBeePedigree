module.exports = app => {
  const fertilizations = require("../controllers/fertilization.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", fertilizations.create);

  // Retrieve all Tutorials
  router.get("/", fertilizations.findAll);




  app.use("/api/fertilizations", router);
};
