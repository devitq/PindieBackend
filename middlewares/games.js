// middlewares/games.js

const games = require("../models/game");

const createGame = async (req, res, next) => {
  try {
    req.game = await games.create(req.body);
    next();
  } catch {
    res.status(400).send("Ошибка создания игры");
  }
};

const findAllGames = async (req, res, next) => {
  const categoryNames = req.query["categories.name"];

  if (categoryNames && Array.isArray(categoryNames)) {
    const gamesArray = await games.findGameByCategories(categoryNames);
    req.gamesArray = gamesArray;
    next();
  } else if (categoryNames) {
    const gamesArray = await games.findGameByCategories([categoryNames]);
    req.gamesArray = gamesArray;
    next();
  } else {
    const gamesArray = await games.find({}).populate("categories").populate({
      path: "users",
      select: "-password",
    });
    req.gamesArray = gamesArray;
    next();
  }
};

const findGameById = async (req, res, next) => {
  try {
    req.game = await games
      .findById(req.params.id)
      .populate("categories")
      .populate("users")
      .populate({
        path: "users",
        select: "-password",
      });
    next();
  } catch {
    res.status(404).send({ message: "Игра не найдена" });
  }
};

const updateGame = async (req, res, next) => {
  try {
    req.game = await games.findByIdAndUpdate(req.params.id, req.body);
    next();
  } catch {
    res.status(400).send({ message: "Ошибка обновления игры" });
  }
};

const deleteGame = async (req, res, next) => {
  try {
    req.game = await games.findByIdAndDelete(req.params.id);
    next();
  } catch {
    res.status(400).send({ message: "Ошибка удаления игры" });
  }
};

const checkEmptyFields = async (req, res, next) => {
  if (
    !req.body.title ||
    !req.body.description ||
    !req.body.image ||
    !req.body.link ||
    !req.body.developer
  ) {
    res.setHeader("Content-Type", "application/json");
    res.status(400).send(JSON.stringify({ message: "Заполните все поля" }));
  } else {
    next();
  }
};

const checkIfUsersAreSafe = async (req, res, next) => {
  if (!req.body.users) {
    next();
    return;
  }
  if (req.body.users.length - 1 === req.game.users.length) {
    next();
    return;
  } else {
    res.setHeader("Content-Type", "application/json");
    res.status(400).send(
      JSON.stringify({
        message:
          "Нельзя удалять пользователей или добавлять больше одного пользователя",
      })
    );
  }
};

const checkIfCategoriesAvaliable = async (req, res, next) => {
  if (!req.body.categories || req.body.categories.length === 0) {
    res.setHeader("Content-Type", "application/json");
    res
      .status(400)
      .send(JSON.stringify({ message: "Выберите хотя бы одну категорию" }));
  } else {
    next();
  }
};

const checkIsGameExists = async (req, res, next) => {
  const isInArray = req.gamesArray.find((game) => {
    return (
      req.body.title === game.titlev && game._id.toString() !== req.params.id
    );
  });

  if (isInArray) {
    res.setHeader("Content-Type", "application/json");
    res
      .status(400)
      .send(
        JSON.stringify({ message: "Игра с таким названием уже существует" })
      );
  } else {
    next();
  }
};

const voteGame = async (req, res, next) => {
  try {
    req.game = await games.findById(req.params.id).populate("users");

    const { success } = await games.vote(req.game, req.user);

    if (!success) {
      res.setHeader("Content-Type", "application/json");
      res
        .status(400)
        .send(JSON.stringify({ message: "Ошибка при голосовании" }));
    }

    next();
  } catch {
    res.setHeader("Content-Type", "application/json");
    res.status(404).send(JSON.stringify({ message: "Игра не найдена" }));
  }
};

const unvoteGame = async (req, res, next) => {
  try {
    req.game = await games.findById(req.params.id).populate("users");

    const { success } = await games.unvote(req.game, req.user);

    if (!success) {
      res.setHeader("Content-Type", "application/json");
      res
        .status(400)
        .send(JSON.stringify({ message: "Ошибка при отмене голоса" }));
    }

    next();
  } catch {
    res.setHeader("Content-Type", "application/json");
    res.status(404).send(JSON.stringify({ message: "Игра не найдена" }));
  }
};

module.exports = {
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
};
