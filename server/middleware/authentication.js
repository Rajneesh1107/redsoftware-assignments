const { verifyAccessToken } = require("../lib/helper/common");
const { http } = require("../lib/helper/const");

exports.auth = (req, res, next) => {
  const token = req.headers.authorization.trim().split(" ")[1];

  try {
    if (!token) {
      res
        .status(http.INTERNAL_SERVER_ERROR)
        .send({ msg: "error", error: "token configuration is missing" });
    }

    const decoded = verifyAccessToken(token);

    if (!decoded) {
      return res.status(http.UNAUTHORIZED).send({
        msg: "error",
        error: "Token is invalid, please login again!",
      });
    }
    req.body = { ...req.body, userDetails: { ...decoded } };
    next();
  } catch (error) {
    return res.status(http.BAD_REQUEST).send({
      msg: "error",
      error: "authentication fail!",
    });
  }
};
