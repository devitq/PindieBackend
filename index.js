// index.js

const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const { DB_URL, PORT } = require("./config");

const cors = require("./middlewares/cors");
const { connectToDatabase } = require("./database/connect");

const { categoriesRouter, gamesRouter, usersRouter } = require("./routes");

const app = express();

connectToDatabase(DB_URL);

app.use(
  cors,
  bodyParser.json(),
  express.static(path.join(__dirname, "public")),
  categoriesRouter,
  gamesRouter,
  usersRouter,
);

app.listen(PORT, () => {
  console.log(`Приложение запущено на: http://localhost:${PORT}`);
});
