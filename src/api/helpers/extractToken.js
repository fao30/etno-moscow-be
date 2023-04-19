require("dotenv").config();
const jwt = require("jsonwebtoken");

const ExtractToken = (token) => {
  const secreteKey = process.env.ACCESS_TOKEN_SECRET;

  let resData;
  const res = jwt.verify(token, secreteKey, (err, decode) => {
    if (err) {
      resData = null;
    } else {
      resData = decode;
    }
  });

  if (resData) {
    const result = resData;
    return result;
  }
  return null;
};

module.exports = ExtractToken;
