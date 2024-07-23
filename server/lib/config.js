require("dotenv").config({ silent: true });

// Importing all necessary environment variables and exporting them as a module.
module.exports = {
  port: process.env.PORT,
  mongoUri: process.env.MONGO_URI,
  saltRound: process.env.SALT_ROUND,
  accessKey: process.env.SECRET_ACCESS_KEY_USER,
  refreshKey: process.env.SECRET_REFRESH_KEY_USER,
  corsOptions: {
    origin: "*",
    optionsSuccessStatus: 200,
  },
};
