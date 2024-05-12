// controllers/pages.js

const path = require("path");

const sendIndex = (req, res) => {
  if (req.user && req.user.admin) {
    return res.redirect("/admin");
  }
  return res.sendFile(path.join(path.resolve(), "../public/index.html"));
};

const sendDashboard = (req, res) => {
  if (!req.user.admin) {
    return res.redirect("/?not_admin=true");
  }
  return res.sendFile(
    path.join(path.resolve(), "../public/admin/dashboard.html")
  );
};

module.exports = { sendIndex, sendDashboard };
