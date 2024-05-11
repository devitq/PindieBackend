// middlewares/cors.js

const { CORS } = require("../config");

function cors(req, res, next) {
  const { origin } = req.headers;

  if (CORS.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }

  next();
}

module.exports = { cors };
