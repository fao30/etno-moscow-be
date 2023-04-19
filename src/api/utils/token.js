require("dotenv").config();
const jwt = require("jsonwebtoken");

class JWT {
  static async token(req, res, next) {
    const bearer = req.headers["authorization"];
    if (!bearer) return res.json("Token not found");
    const token = bearer.split(" ")[1];

    const body = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    return body;
  }

  static async jwtToken(req, res, next) {
    const bearer = req.headers["authorization"];
    if (!bearer) return res.json("Token not found");
    const token = bearer.split(" ")[1];

    return token;
  }
}

module.exports = JWT;
