// index.js

const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");

const { DB_URL, PORT } = require("./config");

const { cors } = require("./middlewares/cors");
const { excludeHTML } = require("./middlewares/static");
const { connectToDatabase } = require("./database/connect");

const { apiRouter, pagesRouter } = require("./routes");

const app = express();

connectToDatabase(DB_URL);

app.use(
  cors,
  excludeHTML,
  cookieParser(),
  bodyParser.json(),
  apiRouter,
  pagesRouter,
  express.static(path.join(__dirname, "public")),
);

app.listen(PORT, () => {
  console.log(`Приложение запущено на: http://localhost:${PORT}`);
});
