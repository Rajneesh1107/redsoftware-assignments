const {
  Users,
  registerUser,
  login,
  userDetails,
} = require("../../controllers/user.controller");

module.exports = (app) => {
  app.get("/api/user/:id", userDetails);
  app.post("/api/register", registerUser);
  app.post("/api/login", login);
  app.get("/logout");
};
