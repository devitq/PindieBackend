// routes/users.js

const usersRouter = require("express").Router();

const {
  createUser,
  findAllUsers,
  findUserById,
  updateUser,
  deleteUser,
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
  checkEmptyNameAndEmailAndPassword,
  findAllUsers,
  checkIsUserExists,
  createUser,
  sendUserCreated,
);
usersRouter.get("/users", findAllUsers, sendAllUsers);
usersRouter.get("/users/:id", findUserById, sendUserById);
usersRouter.put(
  "/users/:id",
  checkEmptyNameAndEmail,
  findAllUsers,
  checkIsUserExists,
  updateUser,
  sendUserUpdated,
);
usersRouter.delete("/users/:id", deleteUser, sendUserDeleted);

module.exports = usersRouter;
