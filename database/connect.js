// database/connect.js

const mongoose = require("mongoose");

const { logger } = require("../logger");

async function connectToDatabase(DB_URL) {
	try {
		await mongoose.connect(DB_URL);
		logger.info("Connected to mongodb");
	} catch (err) {
		logger.error("Error connecting to mongodb");
		logger.error(err);
	}
}

module.exports = { connectToDatabase };
