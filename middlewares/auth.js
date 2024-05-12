// middlewares/auth.js

const jwt = require("jsonwebtoken");

const users = require("../models/user");

const { SECRET_KEY } = require("../config");

const Authorize = async (req, res, next) => {
  let token;

  const { authorization } = req.headers;

  if (authorization && authorization.startsWith("Bearer ")) {
    token = authorization.replace("Bearer ", "");
  } else {
    token = req.cookies.jwt;
  }

  if (!token) {
    return res.status(401).send({ message: "Необходима авторизация" });
  }

  try {
    req.token = await jwt.verify(token, SECRET_KEY);
    req.user = await users.findById(req.token._id, { password: 0 });
    
    if (!req.user) {
      return res.status(401).send({ message: "Необходима авторизация" });
    }
  } catch (err) {
    return res.status(401).send({ message: "Необходима авторизация" });
  }

  next();
};

module.exports = { Authorize };
