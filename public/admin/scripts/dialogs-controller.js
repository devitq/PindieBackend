import { appendGameForm, appendCategoryForm, appendUserForm } from "./forms.js";
import {
  removeCategoryFormListeners,
  removeUserFormListeners,
  removeGameFormListeners,
} from "./requests.js";
const buttons = [...document.querySelectorAll(".call-dialog-button")];
const dialog = document.querySelector(".form-dialog");
const closeButton = dialog?.querySelector(".close-dialog-button");

let dialogOpened = false; // eslint-disable-line

export const openDialog = () => {
  dialog.showModal();
  document.body.classList.add("scroll-block");
  dialogOpened = true;
};

export const closeDialog = () => {
  removeCategoryFormListeners();
  removeUserFormListeners();
  removeGameFormListeners();
  document.querySelector(".form-container").innerHTML = "";
  dialog.close();
  document.body.classList.remove("scroll-block");
  dialogOpened = false;
};

const formSwitch = (caseName) => {
  switch (caseName) {
    case "game":
      appendGameForm();
      break;
    case "category":
      appendCategoryForm();
      break;
    case "user":
      appendUserForm();
      break;
    default:
      console.log("Unknown case");
  }
};

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    openDialog();
    button.classList.contains("add-game-button")
      ? formSwitch("game")
      : button.classList.contains("add-category-button")
        ? formSwitch("category")
        : formSwitch("user");
  });
});

closeButton && closeButton.addEventListener("click", closeDialog);
