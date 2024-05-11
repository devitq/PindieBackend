const apiRouter = require("express").Router();

const categoriesRouter = require("./categories");
const gamesRouter = require("./games");
const usersRouter = require("./users");

apiRouter.use("/api", gamesRouter);
apiRouter.use("/api", usersRouter);
apiRouter.use("/api", categoriesRouter);

module.exports = apiRouter;
