const express = require("express");
const cors = require("cors");

const app = express();

// Enable CORS for your Angular app
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"]
}));

// parse requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// simple test route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Test application." });
});

// Make sure filename is correct: tutorial.routes.js
require("./app/routes/tutorial.routes")(app);

// port
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

