const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.tutorials = require("./tutorial.model.js")(mongoose);

db.pedigrees = require("./pedigree.model.js")(mongoose);

db.breeders = require("./breeder.model")(mongoose);
db.fertilizations = require("./fertilization.model")(mongoose);


db.user = require("./auth/user.model");
db.role = require("./auth/role.model");


db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
