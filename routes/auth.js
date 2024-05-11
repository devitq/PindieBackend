// routes/auth.js

const authRouter = require("express").Router();

const { login, sendMe } = require("../controllers/auth.js");
const { Authorize } = require("../middlewares/auth.js");

authRouter.post("/auth/login", login);
authRouter.get("/auth/me", Authorize, sendMe);

module.exports = authRouter;
