const ExtractToken = require("../helpers/extractToken");
const AppError = require("../helpers/AppError");

const admin = async (req, res) => {
  const bearer = req.headers["authorization"];
  const token = bearer?.split(" ")[1];
  console.log(token, "<<=== this is token");
  if (!token) {
    throw new AppError(401, "Unauthorized", 400);
  }

  const body = ExtractToken(token);
  if (!body) {
    throw new AppError(204, "Token is empty", 400);
  }

  // if (body.user.roleId !== 1) {
  // 	throw new AppError(401, "Unauthorized", 401);
  // }
};

module.exports = admin;
