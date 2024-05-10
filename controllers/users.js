// controllers/users.js

const sendUserCreated = (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.status(201)
  res.end(JSON.stringify(req.user));
};

const sendAllUsers = (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(req.usersArray));
};

const sendUserById = (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(req.user));
};

const sendUserUpdated = (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.end({ message: "Пользователь обновлён" });
};

const sendUserDeleted = (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(req.user));
};

module.exports = {
  sendUserCreated,
  sendAllUsers,
  sendUserById,
  sendUserUpdated,
  sendUserDeleted,
};
