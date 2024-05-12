// config.js

require("dotenv").config();

const PORT = process.env.PORT || 3000;
const DB_URL =
	process.env.DB_URL ||
	"mongodb+srv://pindie:pindie@localhost/pindie";
const CORS = process.env.CORS
	? process.env.CORS.split(",")
	: ["localhost"];
const SECRET_KEY = process.env.SECRET_KEY || "insecure_secret_key";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1d";
const LOGIN_PATH = "/";

module.exports = { PORT, DB_URL, CORS, SECRET_KEY, JWT_EXPIRES_IN, LOGIN_PATH };
