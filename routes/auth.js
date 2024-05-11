// routes/auth.js

const authRouter = require("express").Router();

const { login, sendProfile } = require("../controllers/auth.js");
const { checkAuth } = require("../middlewares/auth.js");

authRouter.post("/auth/login", login);
authRouter.get("/auth/profile", checkAuth, sendProfile);

module.exports = authRouter;
