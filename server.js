require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require('path');



const app = express();

var corsOptions = {
  //origin: "http://127.0.0.1:8081"
  origin: "http://localhost:8081" 
};

// 0 = deploy
var flag = 0;
if (flag == 1) {
  app.use(cors(corsOptions));
} if (flag == 0) {
  app.use(cors());
  // Set Static Folder
  app.use(express.static(path.join(__dirname, 'public')));

}




// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");
const Role = db.role;


db.mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    //initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

/* simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Lagerhub application." });
});
*/
// routes
require("./app/routes/auth/auth.routes")(app);
require("./app/routes/auth/user.routes")(app);
require("./app/routes/turorial.routes")(app);
require("./app/routes/pedigree.routes")(app);
require("./app/routes/breeder.routes")(app);


console.log(`${db}`);
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});



function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "moderator"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'moderator' to roles collection");
      });

      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}

