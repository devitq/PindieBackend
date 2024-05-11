// routes/categories.js

const categoriesRouter = require("express").Router();

const { checkAuth } = require("../middlewares/auth.js");

const {
  createCategory,
  findAllCategories,
  findCategoryById,
  updateCategory,
  deleteCategory,
  checkEmptyName,
  checkIsCategoryExists,
} = require("../middlewares/categories");
const {
  sendCategoryCreated,
  sendAllCategories,
  sendCategoryById,
  sendCategoryUpdated,
  sendCategoryDeleted,
} = require("../controllers/categories");

categoriesRouter.post(
  "/categories",
  checkAuth,
  checkEmptyName,
  findAllCategories,
  checkIsCategoryExists,
  createCategory,
  sendCategoryCreated,
);
categoriesRouter.get("/categories", findAllCategories, sendAllCategories);
categoriesRouter.get("/categories/:id", findCategoryById, sendCategoryById);
categoriesRouter.put(
  "/categories/:id",
  checkAuth,
  checkEmptyName,
  findAllCategories,
  checkIsCategoryExists,
  updateCategory,
  sendCategoryUpdated,
);
categoriesRouter.delete(
  "/categories/:id",
  checkAuth,
  deleteCategory,
  sendCategoryDeleted,
);

module.exports = categoriesRouter;
