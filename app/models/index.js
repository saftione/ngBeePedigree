const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.tutorials = require("./tutorial.model.js")(mongoose);

//db.moves = require("./movement/move.model.js")(mongoose);

db.user = require("./auth/user.model");
db.role = require("./auth/role.model");
db.companys = require("./auth/company.model")(mongoose);



db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
