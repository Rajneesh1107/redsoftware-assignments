const express = require("express");
const cors = require("cors");
const fs = require("fs");
const helmet = require("helmet");
const morgan = require("morgan");
const { port, corsOptions } = require("./lib/config");
const { connection } = require("./lib/db/mongoDB");
// Create an instance of Express application
const app = express();

// Middlewares
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(cors(corsOptions)); // Enable CORS
app.use(helmet()); // Secure HTTP headers
app.use(morgan("dev")); // Logging HTTP requests

// Dynamically load all routes
fs.readdirSync(`${__dirname}/routes/api`).map((file) => {
  return require(`./routes/api/${file}`)(app);
});

// if port configuration is missing server will run default port 8080
const PORT = port || 8080;

// Start the server
app.listen(PORT, async () => {
  // Establish connection to MongoDB
  await connection();

  // Log server start-up message
  console.log(`server is running port at ${PORT}`);
});
