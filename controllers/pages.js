// controllers/pages.js

const path = require("path");

const { LOGIN_PATH } = require("../config");

const sendLogin = (req, res) => {
  if (req.user && req.user.admin) {
    return res.redirect("/admin");
  }
  return res.sendFile(path.join(path.resolve(), "./public/login.html"));
};

const sendDashboard = (req, res) => {
  if (!req.user.admin) {
    return res.redirect(`${LOGIN_PATH}/?not_admin=true`);
  }
  return res.sendFile(
    path.join(path.resolve(), "./public/admin/dashboard.html")
  );
};

module.exports = { sendLogin, sendDashboard };
