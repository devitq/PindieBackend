// models/game.js

const mongoose = require("mongoose");

const userModel = require("./user");
const categoryModel = require("./category");

const gameSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  developer: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: userModel,
    },
  ],
  categories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: categoryModel,
    },
  ],
});

gameSchema.statics.findGameByCategories = async function (categories) {
  const games = await this.find()
    .populate({
      path: "categories",
      match: { name: { $in: categories } },
    })
    .populate({
      path: "users",
      select: "-password",
    });

  return games.filter((game) => game.categories.length > 0);
};

gameSchema.statics.vote = async function (game, user) {
  try {
    const userExists = game.users.some((targetUser) =>
      targetUser._id.equals(user._id)
    );

    if (!userExists) {
      game.users.push(user._id);
      await game.save();
      return {
        success: true,
      };
    } else {
      return { success: true };
    }
  } catch {
    return {
      success: false,
    };
  }
};

gameSchema.statics.unvote = async function (game, user) {
  try {
    const userExists = game.users.some((targetUser) =>
      targetUser._id.equals(user._id)
    );

    if (userExists) {
      game.users.pull(user._id);
      await game.save();
      return {
        success: true,
      };
    } else {
      return { success: true };
    }
  } catch {
    return {
      success: false,
    };
  }
};

module.exports = mongoose.model("game", gameSchema);
