// routes/ping.js

const pingRouter = require("express").Router();

pingRouter.get("/ping", (req, res) => {
  res.send("pong");
});

module.exports = pingRouter;
