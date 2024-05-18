// database/connect.js

const mongoose = require("mongoose");

const { logger } = require("../logger");

async function connectToDatabase(MONGODB_CONN) {
  try {
    await mongoose.connect(MONGODB_CONN);
    logger.info("Connected to mongodb");
  } catch (err) {
    logger.error("Error connecting to mongodb");
    logger.error(err);
  }
}

module.exports = { connectToDatabase };
