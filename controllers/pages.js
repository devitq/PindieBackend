// controllers/pages.js

const path = require("path");

const sendIndex = (req, res) => {
  if (req.user) {
    return res.redirect("/admin");
  }
  return res.sendFile(path.join(__dirname, "../public/index.html"));
};

const sendDashboard = (req, res) => {
  return res.sendFile(path.join(__dirname, "../public/admin/dashboard.html"));
};

module.exports = { sendIndex, sendDashboard };
