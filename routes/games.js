// routes/games.js

const gamesRouter = require("express").Router();

const { Authorize, checkAdmin } = require("../middlewares/auth.js");

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
  voteGame,
  unvoteGame,
} = require("../middlewares/games");
const {
  sendGameCreated,
  sendAllGames,
  sendGameById,
  sendGameUpdated,
  sendGameDeleted,
  sendVoteResult,
} = require("../controllers/games");

gamesRouter.post(
  "/games",
  Authorize,
  checkAdmin,
  checkEmptyFields,
  checkIfCategoriesAvaliable,
  findAllGames,
  checkIsGameExists,
  createGame,
  sendGameCreated
);
gamesRouter.get("/games", findAllGames, sendAllGames);
gamesRouter.get("/games/:id", findGameById, sendGameById);
gamesRouter.put(
  "/games/:id",
  Authorize,
  checkAdmin,
  checkEmptyFields,
  findGameById,
  checkIfUsersAreSafe,
  checkIfCategoriesAvaliable,
  findAllGames,
  checkIsGameExists,
  updateGame,
  sendGameUpdated
);
gamesRouter.delete(
  "/games/:id",
  Authorize,
  checkAdmin,
  deleteGame,
  sendGameDeleted
);
gamesRouter.post("/games/:id/vote", Authorize, voteGame, sendVoteResult);
gamesRouter.post("/games/:id/unvote", Authorize, unvoteGame, sendVoteResult);

module.exports = gamesRouter;
