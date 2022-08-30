const jwt = require("jsonwebtoken");
const User = require("../models/user");

async function isLoggined(req, res, next) {
  const token = req.header("x-auth-token");

  if (!token) res.status(401).send("access denied");
  else {
    try {
      const decoded = jwt.verify(token, process.env.JWT_KEY);
      const user = await User.findById(decoded.id);
      console.log(user);
      req.user = user;
      next();
    } catch (error) {
      res.status(400).send("invalid token");
    }
  }
}

async function isAdmin(req, res, next) {
  if (!req.user.isAdmin) res.status(403).send("access denied");
  else next();
}

module.exports = { isLoggined, isAdmin };
