const express = require("express");
const cors = require("cors");
const fs = require("fs");
const helmet = require("helmet");
const morgan = require("morgan");
// Create an instance of Express application
const app = express();

// Middlewares
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(cors()); // Enable CORS
app.use(helmet()); // Secure HTTP headers
app.use(morgan("dev")); // Logging HTTP requests

// Dynamically load all routes
fs.readdirSync(`${__dirname}/routes/api`).map((file) => {
  return require(`./routes/api/${file}`)(app);
});

app.listen(4000, () => {
  console.log("server is running port at 4000");
});
