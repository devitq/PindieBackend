import { appendCategoryEditModeForm } from "./forms.js";

const appendGameCategoriesList = (categoriesArray, parent) => {
  categoriesArray.forEach((category) => {
    const listItem = document.createElement("li");
    listItem.dataset.id = category._id;
    listItem.textContent = category.name;
    parent.append(listItem);
  });
};

const generateGamesList = (gamesArray, template, parent) => {
  if (gamesArray.length <= 0) {
    parent.textContent = "Пока игр нет, добавьте новую игру.";
    return;
  }
  gamesArray.forEach((element) => {
    const clone = template.content.cloneNode(true);
    clone.querySelector("h3").textContent = element.title;
    clone.querySelector(".text").textContent = element.description;
    clone.querySelector(".developer").textContent = element.developer;
    clone.querySelector(".image-url-input").value = element.image;
    const catlist = clone.querySelector(".categories");
    appendGameCategoriesList(element.categories, catlist);
    const voteslist = clone.querySelector(".votes");
    if (element.users && element.users.length > 0) {
      element.users.forEach((user) => {
        const listItem = document.createElement("li");
        listItem.dataset.id = user._id;
        listItem.textContent = user.username;
        voteslist.append(listItem);
      });
    } else {
      clone.querySelector(".users").style.display = "none";
    }

    clone.querySelector("img").src = element.image;
    clone.querySelector("a").href = element.link;
    clone.querySelector("a").textContent = element.link;
    clone.querySelector(".edit-game-button").dataset.id = element._id;
    clone.querySelector(".delete-game-button").dataset.id = element._id;
    clone.querySelector("article").id = `game-${element._id}`;
    parent.append(clone);
  });
};

const renderGames = (gamesArray) => {
  const template = document.querySelector("#game-list-item");
  const parent = document.querySelector(".games-list");
  generateGamesList(gamesArray, template, parent);
};

const generateUsersList = (usersArray, template, parent) => {
  if (usersArray.length <= 0) {
    parent.textContent =
      "Пока пользователей нет, добавьте нового пользователя.";
    return;
  }
  usersArray.forEach((element) => {
    const clone = template.content.cloneNode(true);
    clone.querySelector(".name").textContent = element.username;
    clone.querySelector("li").id = `user-${element._id}`;
    clone.querySelector(".edit-user-button").dataset.id = element._id;
    clone.querySelector(".delete-user-button").dataset.id = element._id;
    clone.querySelector(".email").textContent = element.email;
    parent.append(clone);
  });
};

const renderUsersList = (usersArray) => {
  const template = document.querySelector("#user-list-item");
  const parent = document.querySelector(".users-list");
  generateUsersList(usersArray, template, parent);
};

const generateCategoriesList = (categoriesArray, template, parent) => {
  if (categoriesArray.length <= 0) {
    parent.textContent = "Пока категорий нет, добавьте новую категорию.";
    return;
  }
  categoriesArray.forEach((element) => {
    const clone = template.content.cloneNode(true);
    clone.querySelector("li").id = `category-${element._id}`;
    clone.querySelector(".edit-category-button").dataset.id = element._id;
    clone.querySelector(".delete-category-button").dataset.id = element._id;
    clone.querySelector(".name").textContent = element.name;
    parent.append(clone);
  });
};

const renderCategoriesList = (categoriesArray) => {
  const template = document.querySelector("#category-list-item");
  const parent = document.querySelector(".categories-list");
  generateCategoriesList(categoriesArray, template, parent);
};

const createGameCategoriesForm = (gameId, categoriesState, currentState) => {
  // Создаём форму для редактирования категорий
  const form = document.createElement("form");
  form.className = "game-categories-form";
  document.querySelector(`#game-${gameId} .category`).after(form);
  appendCategoryEditModeForm(categoriesState, form);
  //расставляем checked
  let targetCategories = categoriesState.filter((item) =>
    currentState.categories.includes(item._id)
  );
  const checkboxes = [
    ...document.querySelectorAll(`#game-${gameId} .game-categories-form input`),
  ];
  checkboxes.forEach((checkbox) => {
    if (targetCategories.find((category) => category._id === checkbox.value)) {
      checkbox.checked = true;
    }
  });
};

const removeGameCategoriesForm = (gameId) => {
  const categoriesForm = document.querySelector(
    `#game-${gameId} .game-categories-form`
  );
  categoriesForm.remove();
};

const createGameCategoryBlock = (gameId, categoriesState, currentState) => {
  const ul = document.createElement("ul");
  ul.className = "categories";
  document.querySelector(`#game-${gameId} .category`).after(ul);
  const targetCategories = categoriesState.filter((item) =>
    currentState.categories.includes(item._id)
  );
  appendGameCategoriesList(targetCategories, ul);
};

const removeGameCategoryBlock = (gameId) => {
  const categoriesBlock = document.querySelector(`#game-${gameId} .categories`);
  categoriesBlock.remove();
};

const showVotesBlock = (gameId) => {
  const votesBlock = document.querySelector(`#game-${gameId} .votes`);
  const votesHeading = document.querySelector(`#game-${gameId} .users`);
  votesHeading.removeAttribute("style");
  votesBlock.removeAttribute("style");
};

const hideVotesBlock = (gameId) => {
  const votesBlock = document.querySelector(`#game-${gameId} .votes`);
  const votesHeading = document.querySelector(`#game-${gameId} .users`);
  votesHeading.style.display = "none";
  votesBlock.style.display = "none";
  document.querySelector(`#game-${gameId} .votes`).style.display = "none";
};

const hideTooltip = () => {
  document.querySelector(".tooltip").classList.remove("active");
  document.querySelector(".tooltip").textContent = "";
  document.querySelector(".tooltip").close();
};

const showTooltip = (text) => {
  document.querySelector(".tooltip").textContent = text;
  document.querySelector(".tooltip").showModal();
  document.querySelector(".tooltip").classList.add("active");
  setTimeout(hideTooltip, 2000);
};

export {
  renderGames,
  renderUsersList,
  renderCategoriesList,
  appendGameCategoriesList,
  createGameCategoriesForm,
  removeGameCategoriesForm,
  createGameCategoryBlock,
  removeGameCategoryBlock,
  showTooltip,
  hideTooltip,
  hideVotesBlock,
  showVotesBlock,
};
