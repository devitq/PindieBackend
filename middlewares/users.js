// middlewares/users.js

const bcrypt = require("bcryptjs");

const users = require("../models/user");

const createUser = async (req, res, next) => {
  try {
    req.user = await users.create(req.body);
    next();
  } catch {
    res.setHeader("Content-Type", "application/json");
    res
      .status(400)
      .send(JSON.stringify({ message: "Ошибка создания пользователя" }));
  }
};

const findAllUsers = async (req, res, next) => {
  req.usersArray = await users.find({}, { password: 0 });

  next();
};

const findUserById = async (req, res, next) => {
  try {
    req.user = await users.findById(req.params.id, { password: 0 });
    next();
  } catch {
    res.setHeader("Content-Type", "application/json");
    res.status(404).send(JSON.stringify({ message: "Пользователь не найден" }));
  }
};

const updateUser = async (req, res, next) => {
  try {
    req.user = await users.findByIdAndUpdate(req.params.id, req.body);
    next();
  } catch (error) {
    res
      .status(400)
      .send({ message: `Ошибка обновления пользователя: ${error}` });
  }
};

const deleteUser = async (req, res, next) => {
  try {
    req.user = await users.findByIdAndDelete(req.params.id);
    next();
  } catch {
    res.setHeader("Content-Type", "application/json");
    res
      .status(400)
      .send(JSON.stringify({ message: "Ошибка удаления пользователя" }));
  }
};

const hashPassword = async (req, res, next) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);
    req.body.password = hash;
    next();
  } catch {
    res.status(400).send({ message: "Ошибка хеширования пароля" });
  }
};

const checkEmptyNameAndEmailAndPassword = async (req, res, next) => {
  if (!req.body.username || !req.body.email || !req.body.password) {
    res.setHeader("Content-Type", "application/json");
    res
      .status(400)
      .send(JSON.stringify({ message: "Введите имя, email и пароль" }));
  } else {
    next();
  }
};

const checkEmptyNameAndEmail = async (req, res, next) => {
  if (!req.body.username || !req.body.email) {
    res.setHeader("Content-Type", "application/json");
    res.status(400).send(JSON.stringify({ message: "Введите имя и email" }));
  } else {
    next();
  }
};

const validateUsername = async (req, res, next) => {
  const pattern = /^[0-9A-Za-z]{3,32}$/;
  if (!pattern.test(req.body.username)) {
    res.setHeader("Content-Type", "application/json");
    res
      .status(400)
      .send(JSON.stringify({ message: "Неправильный формат имени" }));
  } else {
    next();
  }
};

const validateEmail = async (req, res, next) => {
  const pattern = /^\S+@\S+\.\S+$/;
  if (!pattern.test(req.body.email)) {
    res.setHeader("Content-Type", "application/json");
    res
      .status(400)
      .send(JSON.stringify({ message: "Неправильный формат email" }));
  } else {
    next();
  }
};

const checkIsUserExists = async (req, res, next) => {
  const isUsernameInArray = req.usersArray.find((user) => {
    return (
      req.body.username === user.username &&
      user._id.toString() !== req.params.id
    );
  });
  const isEmailInArray = req.usersArray.find((user) => {
    return (
      req.body.email === user.email && user._id.toString() !== req.params.id
    );
  });
  if (isUsernameInArray) {
    res.setHeader("Content-Type", "application/json");
    res.status(400).send(
      JSON.stringify({
        message: "Пользователь с таким именем уже существует",
      })
    );
  } else if (isEmailInArray) {
    res.setHeader("Content-Type", "application/json");
    res.status(400).send(
      JSON.stringify({
        message: "Пользователь с таким email уже существует",
      })
    );
  } else {
    next();
  }
};

module.exports = {
  createUser,
  findAllUsers,
  findUserById,
  updateUser,
  deleteUser,
  hashPassword,
  checkEmptyNameAndEmailAndPassword,
  checkEmptyNameAndEmail,
  validateUsername,
  validateEmail,
  checkIsUserExists,
};
