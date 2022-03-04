const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
require("dotenv").config();
//we will pass token as body, or in request
//then using this token we will authenticate user, if authenticated we will add user to this request
const authentication = async (req, res, next) => {
  const token = req.body.token || req.query.token;

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, process.env.JSON_WEB_TOKEN_SECRET);
    const _user = await userModel.findOne({ email: decoded.userEmail });
    req.user = _user;
  } catch (err) {
    return res.status(401).send(err.message);
  }
  return next();
};

module.exports = authentication;
