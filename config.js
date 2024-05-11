// config.js

const PORT = 3000;
const DB_URL =
  "mongodb+srv://pindie:nqmQuBaiP2CSwU7G@cluster0.gqq4i1y.mongodb.net/pindie";
const CORS = ["https://practicum.yandex.ru", "https://students-projects.ru"];
const SECRET_KEY = "some-secret-key";
const JWT_EXPIRES_IN = "1d";
const LOGIN_PATH = "/";

module.exports = { PORT, DB_URL, CORS, SECRET_KEY, JWT_EXPIRES_IN, LOGIN_PATH };
