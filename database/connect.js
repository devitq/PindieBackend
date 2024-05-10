// database/connect.js

const mongoose = require("mongoose");

async function connectToDatabase(DB_URL) {
  try {
    await mongoose.connect(DB_URL);
    console.log("Успешно подключились к MongoDB");
  } catch (err) {
    console.log("При подключении MongoDB возникла ошибка");
    console.error(err);
  }
}

module.exports = { connectToDatabase };
