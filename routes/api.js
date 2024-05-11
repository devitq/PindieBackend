// routes/api.js

const apiRouter = require("express").Router();

const authRouter = require("./auth");
const categoriesRouter = require("./categories");
const gamesRouter = require("./games");
const usersRouter = require("./users");

apiRouter.use("/api", authRouter);
apiRouter.use("/api", gamesRouter);
apiRouter.use("/api", usersRouter);
apiRouter.use("/api", categoriesRouter);

module.exports = apiRouter;
