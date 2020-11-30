module.exports = app => {
  const pedigrees = require("../controllers/pedigree.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/",pedigrees.create);

  // Retrieve all Tutorials
  router.get("/", pedigrees.findAll);

  // Retrieve all published Tutorials
  router.get("/published", pedigrees.findAllPublished);

  // Retrieve a single Tutorial with id
  router.get("/:id", pedigrees.findOne);

  // Update a Tutorial with id
  router.put("/:id", pedigrees.update);

  // Delete a Tutorial with id
  router.delete("/:id", pedigrees.delete);

  // Create a new Tutorial
  router.delete("/", pedigrees.deleteAll);



  app.use("/api/pedigrees", router);
};
