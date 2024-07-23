const {
  Users,
  registerUser,
  login,
} = require("../../controllers/user.controller");
const { http } = require("../../lib/helper/const");

module.exports = (app) => {
  app.get("/allusers", Users);
  app.post("/api/register", registerUser);
  app.post("/api/login", login);
  app.get("/logout");
};
