// index.js

const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const { DB_URL, PORT } = require("./config");

const cors = require("./middlewares/cors");
const { connectToDatabase } = require("./database/connect");

const { apiRouter } = require("./routes");

const app = express();

connectToDatabase(DB_URL);

app.use(
  cors,
  bodyParser.json(),
  apiRouter,
  express.static(path.join(__dirname, "public")),
);

app.listen(PORT, () => {
  console.log(`Приложение запущено на: http://localhost:${PORT}`);
});
