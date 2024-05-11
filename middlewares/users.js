// middlewares/users.js

const users = require("../models/user");

const createUser = async (req, res, next) => {
  console.log("POST /users");

  try {
    console.log(req.body);
    req.user = await users.create(req.body);
    next();
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    res
      .status(400)
      .send(JSON.stringify({ message: "Ошибка создания пользователя" }));
  }
};

const findAllUsers = async (req, res, next) => {
  console.log("GET /users");

  req.usersArray = await users.find({}, { password: 0 });

  next();
};

const findUserById = async (req, res, next) => {
  console.log("GET /users/:id");

  try {
    req.user = await users.findById(req.params.id, { password: 0 });
    next();
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    res.status(404).send(JSON.stringify({ message: "Пользователь не найден" }));
  }
};

const updateUser = async (req, res, next) => {
  console.log("PUT /users/:id");

  try {
    req.user = await users.findByIdAndUpdate(req.params.id, req.body);
    next();
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .send({ message: `Ошибка обновления пользователя: ${error}` });
  }
};

const deleteUser = async (req, res, next) => {
  console.log("DELETE /users/:id");

  try {
    req.user = await users.findByIdAndDelete(req.params.id);
    next();
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    res
      .status(400)
      .send(JSON.stringify({ message: "Ошибка удаления пользователя" }));
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

const checkIsUserExists = async (req, res, next) => {
  const isInArray = req.usersArray.find((user) => {
    return (
      req.body.email === user.email && user._id.toString() !== req.params.id
    );
  });
  if (isInArray) {
    res.setHeader("Content-Type", "application/json");
    res.status(400).send(
      JSON.stringify({
        message: "Пользователь с таким email уже существует",
      }),
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
  checkEmptyNameAndEmailAndPassword,
  checkEmptyNameAndEmail,
  checkIsUserExists,
};
