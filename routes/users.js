// routes/users.js

const usersRouter = require("express").Router();

const { Authorize, checkAdmin } = require("../middlewares/auth.js");

const {
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
} = require("../middlewares/users");
const {
  sendUserCreated,
  sendAllUsers,
  sendUserById,
  sendUserUpdated,
  sendUserDeleted,
} = require("../controllers/users");

usersRouter.post(
  "/users",
  Authorize,
  checkAdmin,
  checkEmptyNameAndEmailAndPassword,
  validateUsername,
  validateEmail,
  findAllUsers,
  checkIsUserExists,
  hashPassword,
  createUser,
  sendUserCreated
);
usersRouter.get("/users", findAllUsers, sendAllUsers);
usersRouter.get("/users/:id", findUserById, sendUserById);
usersRouter.put(
  "/users/:id",
  Authorize,
  checkAdmin,
  checkEmptyNameAndEmail,
  validateUsername,
  validateEmail,
  findAllUsers,
  checkIsUserExists,
  updateUser,
  sendUserUpdated
);
usersRouter.delete(
  "/users/:id",
  Authorize,
  checkAdmin,
  deleteUser,
  sendUserDeleted
);

module.exports = usersRouter;
