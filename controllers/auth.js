// controllers/auth.js

const jwt = require("jsonwebtoken");

const users = require("../models/user");

const { SECRET_KEY, JWT_EXPIRES_IN } = require("../config");

const login = async (req, res) => {
  const { email, password } = req.body;

  await users
    .findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, SECRET_KEY, {
        expiresIn: JWT_EXPIRES_IN,
      });
      return { user, token };
    })
    .then(({ user, token }) => {
      res.status(200).send({
        _id: user._id,
        username: user.username,
        email: user.email,
        admin: user.admin,
        jwt: token,
      });
    })
    .catch((error) => {
      res.status(401).send({ message: error.message });
    });
};

const signup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    req.user = await users.create({
      username: username,
      email: email,
      password: password,
      admin: false,
    });
  } catch {
    res.setHeader("Content-Type", "application/json");
    res
      .status(400)
      .send(JSON.stringify({ message: "Ошибка создания пользователя" }));

    return;
  }

  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(req.user));
};

const sendMe = (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(req.user));
};

module.exports = { login, signup, sendMe };
