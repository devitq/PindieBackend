// routes/users.js

const usersRouter = require("express").Router();

const { Authorize } = require("../middlewares/auth.js");

const {
  createUser,
  findAllUsers,
  findUserById,
  updateUser,
  deleteUser,
  hashPassword,
  checkEmptyNameAndEmailAndPassword,
  checkEmptyNameAndEmail,
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
  checkEmptyNameAndEmailAndPassword,
  findAllUsers,
  checkIsUserExists,
  hashPassword,
  createUser,
  sendUserCreated,
);
usersRouter.get("/users", findAllUsers, sendAllUsers);
usersRouter.get("/users/:id", findUserById, sendUserById);
usersRouter.put(
  "/users/:id",
  Authorize,
  checkEmptyNameAndEmail,
  findAllUsers,
  checkIsUserExists,
  updateUser,
  sendUserUpdated,
);
usersRouter.delete("/users/:id", Authorize, deleteUser, sendUserDeleted);

module.exports = usersRouter;
