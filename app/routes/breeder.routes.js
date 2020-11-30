module.exports = app => {
  const breeders = require("../controllers/breeder.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/",breeders.create);

  // Retrieve all Tutorials
  router.get("/", breeders.findAll);

  // Retrieve all published Tutorials
  router.get("/published", breeders.findAllPublished);

  // Retrieve a single Tutorial with id
  router.get("/:id", breeders.findOne);

  // Update a Tutorial with id
  router.put("/:id", breeders.update);

  // Delete a Tutorial with id
  router.delete("/:id", breeders.delete);

  // Create a new Tutorial
  router.delete("/", breeders.deleteAll);



  app.use("/api/breeders", router);
};
