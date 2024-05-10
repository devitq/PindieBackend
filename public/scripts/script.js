import { getData } from "./api-interactors.js";
import {
  renderGames,
  renderUsersList,
  renderCategoriesList,
} from "./dom-creators.js";
import { addCategoriesEditModeListeners } from "./categories-edit-mode.js";
import { addGamesEditModeListeners } from "./games-edit-mode.js";
import { addUsersEditModeListeners } from "./users-edit-mode.js";
import {
  addGameFormListeners,
  addCategoryFormListeners,
  addUserFormListeners,
  addDeleteGameListeners,
  addDeleteCategoryListeners,
  addDeleteUsersListeners,
} from "./requests.js";

export let gamesState = [];
export let usersState = [];
export let categoriesState = [];

export async function reload(blockName) {
  switch (blockName) {
    case "games":
      loadGamesBlock();
      break;
    case "users":
      loadUsersBlock();
      break;
    case "categories":
      loadCategoriesBlock();
      break;
    default:
      console.log("Unknown block name");
      break;
  }
}

(async function init() {
  await loadGamesBlock();
  await loadCategoriesBlock();
  await loadUsersBlock();
})();

async function loadGamesBlock() {
  gamesState = await getData("/games");
  document.querySelector(".games-list").innerHTML = "";
  renderGames(gamesState);
  addGamesEditModeListeners();
  addGameFormListeners();
  await addDeleteGameListeners();
}

async function loadUsersBlock() {
  usersState = await getData("/users");
  document.querySelector(".users-list").innerHTML = "";
  renderUsersList(usersState);
  addUsersEditModeListeners();
  await addUserFormListeners();
  await addDeleteUsersListeners();
}

async function loadCategoriesBlock() {
  categoriesState = await getData("/categories");
  document.querySelector(".categories-list").innerHTML = "";
  renderCategoriesList(categoriesState);
  addCategoriesEditModeListeners();
  await addCategoryFormListeners();
  await addDeleteCategoryListeners();
}
