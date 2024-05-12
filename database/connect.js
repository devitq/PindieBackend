// database/connect.js

const mongoose = require("mongoose");

async function connectToDatabase(DB_URL) {
  try {
    await mongoose.connect(DB_URL);
    console.log("Connected to mongodb");
  } catch (err) {
    console.log("Error connecting to mongodb");
    console.error(err);
  }
}

module.exports = { connectToDatabase };
