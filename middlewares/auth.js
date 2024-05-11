// middlewares/auth.js

const jwt = require("jsonwebtoken");

const users = require("../models/user");

const { SECRET_KEY } = require("../config");

const checkAuth = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(401).send({ message: "Необходима авторизация" });
  }

  const token = authorization.replace("Bearer ", "");

  try {
    req.token = await jwt.verify(token, SECRET_KEY);
    req.user = await users.findById(req.token._id, { password: 0 });
  } catch (err) {
    return res.status(401).send({ message: "Необходима авторизация" });
  }

  next();
};

module.exports = { checkAuth };
