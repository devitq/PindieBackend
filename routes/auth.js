// routes/auth.js

const authRouter = require("express").Router();

const { login, signup, sendMe } = require("../controllers/auth.js");
const {
    findAllUsers,
    hashPassword,
    checkEmptyNameAndEmailAndPassword,
    checkIsUserExists,
  } = require("../middlewares/users");
const { Authorize } = require("../middlewares/auth.js");

authRouter.post("/auth/login", login);
authRouter.post(
  "/auth/signup",
  checkEmptyNameAndEmailAndPassword,
  hashPassword,
  findAllUsers,
  checkIsUserExists,
  signup
);
authRouter.get("/auth/me", Authorize, sendMe);

module.exports = authRouter;
