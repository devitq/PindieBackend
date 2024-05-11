// routes/games.js

const gamesRouter = require("express").Router();

const { checkAuth } = require("../middlewares/auth.js");

const {
  createGame,
  findAllGames,
  findGameById,
  updateGame,
  deleteGame,
  checkEmptyFields,
  checkIfUsersAreSafe,
  checkIfCategoriesAvaliable,
  checkIsGameExists,
} = require("../middlewares/games");
const {
  sendGameCreated,
  sendAllGames,
  sendGameById,
  sendGameUpdated,
  sendGameDeleted,
} = require("../controllers/games");

gamesRouter.post(
  "/games",
  checkAuth,
  checkEmptyFields,
  checkIfCategoriesAvaliable,
  findAllGames,
  checkIsGameExists,
  createGame,
  sendGameCreated,
);
gamesRouter.get("/games", findAllGames, sendAllGames);
gamesRouter.get("/games/:id", findGameById, sendGameById);
gamesRouter.put(
  "/games/:id",
  checkAuth,
  checkEmptyFields,
  findGameById,
  checkIfUsersAreSafe,
  checkIfCategoriesAvaliable,
  findAllGames,
  checkIsGameExists,
  updateGame,
  sendGameUpdated,
);
gamesRouter.delete("/games/:id", checkAuth, deleteGame, sendGameDeleted);

module.exports = gamesRouter;
