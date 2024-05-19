// config.js

const config = require("dotenv").config().parsed;

const PORT = config.PORT || 3000;
const MONGODB_CONN = config.MONGODB_CONN || "mongodb://localhost:27017/pindie";
const CORS = config.CORS ? config.CORS.split(",") : ["localhost"];
const SECRET_KEY = config.SECRET_KEY || "insecure_secret_key";
const JWT_EXPIRES_IN = config.JWT_EXPIRES_IN || "1d";
const LOGIN_PATH = "/admin/login";

module.exports = {
  PORT,
  MONGODB_CONN,
  CORS,
  SECRET_KEY,
  JWT_EXPIRES_IN,
  LOGIN_PATH,
};
