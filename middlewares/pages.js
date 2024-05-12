// middlewares/pages.js

const jwt = require("jsonwebtoken");

const users = require("../models/user");

const { SECRET_KEY, LOGIN_PATH } = require("../config");

const AuthorizePages = async (req, res, next) => {
  const onLoginPage = req.path === LOGIN_PATH;

  let token;

  const { authorization } = req.headers;

  if (authorization && authorization.startsWith("Bearer ")) {
    token = authorization.replace("Bearer ", "");
  } else {
    token = req.cookies.jwt;
  }

  if (!token) {
    if (!onLoginPage) {
      res.redirect(LOGIN_PATH);
      return;
    }
  }

  try {
    req.token = await jwt.verify(token, SECRET_KEY);
    req.user = await users.findById(req.token._id, { password: 0 });

    if (!req.user) {
      if (!onLoginPage) {
        res.redirect(LOGIN_PATH);
        return;
      }
    }
  } catch {
    if (!onLoginPage) {
      res.redirect(LOGIN_PATH);
      return;
    }
  }
  next();
};

module.exports = { AuthorizePages };
